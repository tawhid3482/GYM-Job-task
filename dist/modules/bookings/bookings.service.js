"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const prisma = new client_1.PrismaClient();
exports.bookingServices = {
    createBooking: (traineeId, classId) => __awaiter(void 0, void 0, void 0, function* () {
        const schedule = yield prisma.schedule.findUnique({
            where: { id: classId },
            include: { bookings: true },
        });
        if (!schedule)
            throw new AppError_1.default(404, "Class schedule not found");
        const trainee = yield prisma.user.findUnique({
            where: { id: traineeId },
            select: { id: true, name: true, email: true, role: true }, // password hide
        });
        if (!trainee)
            throw new AppError_1.default(404, "Trainee not found");
        if (schedule.bookings.length >= schedule.capacity) {
            throw new AppError_1.default(400, `Class schedule is full. Maximum ${schedule.capacity} trainees allowed per schedule.`);
        }
        const overlappingBooking = yield prisma.booking.findFirst({
            where: {
                traineeId,
                schedule: {
                    startTime: schedule.startTime,
                    endTime: schedule.endTime,
                },
            },
        });
        if (overlappingBooking)
            throw new AppError_1.default(400, "You already have a booking at this time slot.");
        const booking = yield prisma.booking.create({
            data: {
                scheduleId: classId,
                traineeId,
                status: client_1.Status.CONFIRMED,
            },
        });
        // fetch full booking with schedule + trainer + user but hide password
        const fullBooking = yield prisma.booking.findUnique({
            where: { id: booking.id },
            include: {
                schedule: {
                    include: {
                        trainer: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        role: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return Object.assign(Object.assign({}, fullBooking), { trainee }); // trainee object already safe
    }),
    cancelBooking: (bookingId, traineeId) => __awaiter(void 0, void 0, void 0, function* () {
        const booking = yield prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking)
            throw new AppError_1.default(404, "Booking not found");
        if (booking.traineeId !== traineeId)
            throw new AppError_1.default(403, "You can only cancel your own booking");
        return prisma.booking.update({
            where: { id: bookingId },
            data: { status: "CANCELLED" },
        });
    }),
    getBookingsByTrainee: (traineeId) => __awaiter(void 0, void 0, void 0, function* () {
        const bookings = yield prisma.booking.findMany({
            where: { traineeId },
            include: {
                schedule: {
                    include: {
                        trainer: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        role: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        // attach trainee object separately (password hidden)
        const trainee = yield prisma.user.findUnique({
            where: { id: traineeId },
            select: { id: true, name: true, email: true, role: true },
        });
        return bookings.map((b) => (Object.assign(Object.assign({}, b), { trainee })));
    }),
};
//# sourceMappingURL=bookings.service.js.map