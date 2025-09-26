import { PrismaClient } from "@prisma/client";
import AppError from "../../helpers/AppError";
import { ICreateClassSchedule } from "../../types/class.types";

const prisma = new PrismaClient();

export const classServices = {
  createClassSchedule: async (data: ICreateClassSchedule) => {
    const trainer = await prisma.trainer.findUnique({ where: { id: data.trainerId } });
    if (!trainer) throw new AppError(404, "Trainer not found");

    const classDate = new Date(data.date); 
    const startTime = new Date(data.startTime); 
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours class

    const sameDaySchedules = await prisma.schedule.count({
      where: {
        trainerId: data.trainerId,
        date: classDate,
      },
    });
    if (sameDaySchedules >= 5) {
      throw new AppError(400, "Schedule limit exceeded: Maximum 5 classes per day.");
    }

    const overlap = await prisma.schedule.findFirst({
      where: {
        trainerId: data.trainerId,
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } },
        ],
      },
    });
    if (overlap) {
      throw new AppError(400, "Trainer already has a class at this time slot.");
    }

    const schedule = await prisma.schedule.create({
      data: {
        trainerId: data.trainerId,
        date: classDate,
        startTime,
        endTime,
         createdById: data.createdById, 
      },
      include: { trainer: { include: { user: true } } },
    });

    return schedule;
  },

  getAllSchedules: async () => {
    return prisma.schedule.findMany({
      include: { trainer: { include: { user: true } }, bookings: true },
    });
  },

  getScheduleById: async (id: string) => {
    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: { trainer: { include: { user: true } }, bookings: true },
    });
    if (!schedule) throw new AppError(404, "Class schedule not found");
    return schedule;
  },

  deleteSchedule: async (id: string) => {
    const schedule = await prisma.schedule.findUnique({ where: { id } });
    if (!schedule) throw new AppError(404, "Class schedule not found");

    return prisma.schedule.delete({ where: { id } });
  },
};
