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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classServices = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const prisma = new client_1.PrismaClient();
exports.classServices = {
    createClassSchedule: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const trainer = yield prisma.trainer.findUnique({
            where: { id: data.trainerId },
        });
        if (!trainer)
            throw new AppError_1.default(404, "Trainer not found");
        const classDate = new Date(data.date);
        const startTime = new Date(data.startTime);
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours class
        const sameDaySchedules = yield prisma.schedule.count({
            where: {
                trainerId: data.trainerId,
                date: classDate,
            },
        });
        if (sameDaySchedules >= 5) {
            throw new AppError_1.default(400, "Schedule limit exceeded: Maximum 5 classes per day.");
        }
        const overlap = yield prisma.schedule.findFirst({
            where: {
                trainerId: data.trainerId,
                AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
            },
        });
        if (overlap) {
            throw new AppError_1.default(400, "Trainer already has a class at this time slot.");
        }
        const schedule = yield prisma.schedule.create({
            data: {
                trainerId: data.trainerId,
                date: classDate,
                startTime,
                endTime,
                createdById: userId,
            },
            include: { trainer: { include: { user: true } } },
        });
        // password remove
        if ((_a = schedule.trainer) === null || _a === void 0 ? void 0 : _a.user) {
            const _b = schedule.trainer.user, { password } = _b, safeUser = __rest(_b, ["password"]);
            schedule.trainer.user = safeUser;
        }
        return schedule;
    }),
    getAllSchedules: () => __awaiter(void 0, void 0, void 0, function* () {
        const schedules = yield prisma.schedule.findMany({
            include: { trainer: { include: { user: true } }, bookings: true },
        });
        // password remove for all schedules
        const safeSchedules = schedules.map((schedule) => {
            var _a;
            if ((_a = schedule.trainer) === null || _a === void 0 ? void 0 : _a.user) {
                const _b = schedule.trainer.user, { password } = _b, safeUser = __rest(_b, ["password"]);
                schedule.trainer.user = safeUser;
            }
            return schedule;
        });
        return safeSchedules;
    }),
    getScheduleById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const schedule = yield prisma.schedule.findUnique({
            where: { id },
            include: { trainer: { include: { user: true } }, bookings: true },
        });
        if (!schedule)
            throw new AppError_1.default(404, "Class schedule not found");
        // password remove
        if ((_a = schedule.trainer) === null || _a === void 0 ? void 0 : _a.user) {
            const _b = schedule.trainer.user, { password } = _b, safeUser = __rest(_b, ["password"]);
            schedule.trainer.user = safeUser;
        }
        return schedule;
    }),
    deleteSchedule: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const schedule = yield prisma.schedule.findUnique({ where: { id } });
        if (!schedule)
            throw new AppError_1.default(404, "Class schedule not found");
        return prisma.schedule.delete({ where: { id } });
    }),
};
//# sourceMappingURL=schedule.service.js.map