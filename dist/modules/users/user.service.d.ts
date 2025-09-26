export declare const userServices: {
    createUser: (data: {
        name: string;
        email: string;
        password: string;
    }) => Promise<{
        name: string | null;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
    getMe: (userId: string) => Promise<{
        name: string | null;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map