import { ICreateClassSchedule } from "../../types/class.types";
export declare const classServices: {
    createClassSchedule: (userId: string, data: ICreateClassSchedule) => Promise<{
        trainer: {
            user: {
                name: string | null;
                email: string;
                password: string;
                id: string;
                role: import(".prisma/client").$Enums.Role;
                createdAt: Date;
            };
        } & {
            id: string;
            userId: string;
            bio: string | null;
            specialties: string[];
        };
    } & {
        id: string;
        date: Date;
        trainerId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        createdById: string;
    }>;
    getAllSchedules: () => Promise<({
        trainer: {
            user: {
                name: string | null;
                email: string;
                password: string;
                id: string;
                role: import(".prisma/client").$Enums.Role;
                createdAt: Date;
            };
        } & {
            id: string;
            userId: string;
            bio: string | null;
            specialties: string[];
        };
        bookings: {
            id: string;
            createdAt: Date;
            scheduleId: string;
            traineeId: string;
            status: import(".prisma/client").$Enums.Status;
        }[];
    } & {
        id: string;
        date: Date;
        trainerId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        createdById: string;
    })[]>;
    getScheduleById: (id: string) => Promise<{
        trainer: {
            user: {
                name: string | null;
                email: string;
                password: string;
                id: string;
                role: import(".prisma/client").$Enums.Role;
                createdAt: Date;
            };
        } & {
            id: string;
            userId: string;
            bio: string | null;
            specialties: string[];
        };
        bookings: {
            id: string;
            createdAt: Date;
            scheduleId: string;
            traineeId: string;
            status: import(".prisma/client").$Enums.Status;
        }[];
    } & {
        id: string;
        date: Date;
        trainerId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        createdById: string;
    }>;
    deleteSchedule: (id: string) => Promise<{
        id: string;
        date: Date;
        trainerId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        createdById: string;
    }>;
};
//# sourceMappingURL=schedule.service.d.ts.map