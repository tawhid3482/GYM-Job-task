import { ICreateTrainer } from "../../types/trainer.types";
export declare const trainerServices: {
    createTrainer: (data: ICreateTrainer) => Promise<{
        id: string;
        userId: string;
        bio: string | null;
        specialties: string[];
    }>;
    getAllTrainers: () => Promise<({
        user: {
            name: string | null;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
        };
        schedules: {
            id: string;
            date: Date;
            trainerId: string;
            startTime: Date;
            endTime: Date;
            capacity: number;
            createdById: string;
        }[];
    } & {
        id: string;
        userId: string;
        bio: string | null;
        specialties: string[];
    })[]>;
    getTrainerById: (id: string) => Promise<{
        user: {
            name: string | null;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
        };
        schedules: {
            id: string;
            date: Date;
            trainerId: string;
            startTime: Date;
            endTime: Date;
            capacity: number;
            createdById: string;
        }[];
    } & {
        id: string;
        userId: string;
        bio: string | null;
        specialties: string[];
    }>;
};
//# sourceMappingURL=trainers.service.d.ts.map