import { NextFunction, Request, Response } from "express";
type asyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const catchAsync: (fn: asyncHandler) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=catchAsync.d.ts.map