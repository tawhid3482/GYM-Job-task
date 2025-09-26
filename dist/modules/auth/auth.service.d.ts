export declare const AuthService: {
    loginUser: (data: {
        email: string;
        password: string;
    }) => Promise<{
        safeUser: {
            name: string | null;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
        token: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map