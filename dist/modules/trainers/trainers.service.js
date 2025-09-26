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
exports.trainerServices = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const prisma = new client_1.PrismaClient();
exports.trainerServices = {
    createTrainer: (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // check user exist
        const user = yield prisma.user.findUnique({ where: { id: data.userId } });
        if (!user)
            throw new AppError_1.default(404, "User not found");
        // check already trainer
        const existingTrainer = yield prisma.trainer.findUnique({
            where: { userId: data.userId },
        });
        if (existingTrainer)
            throw new AppError_1.default(400, "This user is already a trainer");
        const trainer = yield prisma.trainer.create({
            data: {
                userId: data.userId,
                bio: (_a = data.bio) !== null && _a !== void 0 ? _a : null, // যদি undefined আসে, null হয়ে যাবে
                specialties: data.specialties,
            },
        });
        // update user role -> TRAINER
        yield prisma.user.update({
            where: { id: data.userId },
            data: { role: "TRAINER" }, // Role enum ধরেই TRAINER হবে
        });
        return trainer;
    }),
    getAllTrainers: () => __awaiter(void 0, void 0, void 0, function* () {
        return prisma.trainer.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true },
                },
                schedules: true,
            },
        });
    }),
    getTrainerById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const trainer = yield prisma.trainer.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true },
                },
                schedules: true,
            },
        });
        if (!trainer)
            throw new AppError_1.default(404, "Trainer not found");
        return trainer;
    }),
};
//# sourceMappingURL=trainers.service.js.map