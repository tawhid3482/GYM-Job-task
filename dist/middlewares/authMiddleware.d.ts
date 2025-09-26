import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
export declare const auth: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map