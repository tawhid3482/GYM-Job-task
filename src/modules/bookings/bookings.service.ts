import { PrismaClient, Status } from "@prisma/client";
import AppError from "../../helpers/AppError";

const prisma = new PrismaClient();

export const bookingServices = {
  createBooking: async (traineeId: string, classId: string) => {
    // 1️⃣ check schedule exist
    const schedule = await prisma.schedule.findUnique({
      where: { id: classId },
      include: { bookings: true },
    });
    if (!schedule) throw new AppError(404, "Class schedule not found");

    // 2️⃣ check trainee exist
    const trainee = await prisma.user.findUnique({ where: { id: traineeId } });
    if (!trainee) throw new AppError(404, "Trainee not found");

    // 3️⃣ max capacity check
    if (schedule.bookings.length >= schedule.capacity) {
      throw new AppError(400, `Class schedule is full. Maximum ${schedule.capacity} trainees allowed.`);
    }

    // 4️⃣ check overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        traineeId,
        schedule: {
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        },
      },
    });
    if (overlappingBooking) throw new AppError(400, "You already have a booking at this time slot.");

    // 5️⃣ create booking WITHOUT include trainee (MongoDB-safe)
    const booking = await prisma.booking.create({
      data: {
        scheduleId: classId,
        traineeId,
        status: Status.CONFIRMED,
      },
    });

    // 6️⃣ fetch booking with trainee/user after create
    const fullBooking = await prisma.booking.findUnique({
      where: { id: booking.id },
      include: {
        schedule: { include: { trainer: { include: { user: true } } } },
        trainee: { include: { user: true } },
      },
    });

    return fullBooking;
  },



  cancelBooking: async (bookingId: string, traineeId: string) => {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new AppError(404, "Booking not found");
    if (booking.traineeId !== traineeId) throw new AppError(403, "You can only cancel your own booking");

    return prisma.booking.update({ where: { id: bookingId }, data: { status: "CANCELLED" } });
  },

  getBookingsByTrainee: async (traineeId: string) => {
    return prisma.booking.findMany({
      where: { traineeId },
      include: { schedule: { include: { trainer: { include: { user: true } } } } },
    });
  },
};
