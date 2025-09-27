import { PrismaClient } from "@prisma/client";
import AppError from "../../helpers/AppError";
import { ICreateTrainer } from "../../types/trainer.types";

const prisma = new PrismaClient();

export const trainerServices = {
  createTrainer: async (data: ICreateTrainer) => {
    // check user exist
    const user = await prisma.user.findUnique({ where: { id: data.userId } });
    if (!user) throw new AppError(404, "User not found");

    // check already trainer
    const existingTrainer = await prisma.trainer.findUnique({
      where: { userId: data.userId },
    });
    if (existingTrainer)
      throw new AppError(400, "This user is already a trainer");

    const trainer = await prisma.trainer.create({
      data: {
        userId: data.userId,
        bio: data.bio ?? null, 
        specialties: data.specialties,
      },
    });

   
    await prisma.user.update({
      where: { id: data.userId },
      data: { role: "TRAINER" }, 
    });

    return trainer;
  },

  getAllTrainers: async () => {
    return prisma.trainer.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        schedules: true,
      },
    });
  },

  getTrainerById: async (id: string) => {
    const trainer = await prisma.trainer.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        schedules: true,
      },
    });

    if (!trainer) throw new AppError(404, "Trainer not found");
    return trainer;
  },
};
