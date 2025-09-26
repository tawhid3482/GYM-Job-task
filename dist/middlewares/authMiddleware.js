"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const auth = (...roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization; // শুধু token নেওয়া
        if (!token)
            return next(new AppError_1.default(401, "Unauthorized access", "No token provided"));
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, env_1.envVars.JWT_ACCESS_SECRET);
            if (!roles.includes(decoded.role)) {
                return next(new AppError_1.default(403, "Forbidden", "You are not allowed"));
            }
            req.user = decoded; // TypeScript জানবে id আছে
            next();
        }
        catch (err) {
            return next(new AppError_1.default(401, "Unauthorized access", "Invalid token"));
        }
    };
};
exports.auth = auth;
//# sourceMappingURL=authMiddleware.js.map