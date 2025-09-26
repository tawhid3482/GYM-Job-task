export declare const bookingServices: {
    createBooking: (traineeId: string, classId: string) => Promise<{
        trainee: {
            name: string | null;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
        };
        schedule?: {
            trainer: {
                user: {
                    name: string | null;
                    email: string;
                    id: string;
                    role: import(".prisma/client").$Enums.Role;
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
        };
        id?: string;
        createdAt?: Date;
        scheduleId?: string;
        traineeId?: string;
        status?: import(".prisma/client").$Enums.Status;
    }>;
    cancelBooking: (bookingId: string, traineeId: string) => Promise<{
        id: string;
        createdAt: Date;
        scheduleId: string;
        traineeId: string;
        status: import(".prisma/client").$Enums.Status;
    }>;
    getBookingsByTrainee: (traineeId: string) => Promise<{
        trainee: {
            name: string | null;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
        } | null;
        schedule: {
            trainer: {
                user: {
                    name: string | null;
                    email: string;
                    id: string;
                    role: import(".prisma/client").$Enums.Role;
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
        };
        id: string;
        createdAt: Date;
        scheduleId: string;
        traineeId: string;
        status: import(".prisma/client").$Enums.Status;
    }[]>;
};
//# sourceMappingURL=bookings.service.d.ts.map