"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = __importDefault(require("../helpers/AppError"));
const env_1 = require("../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (roles) => {
    return (req, res, next) => {
        try {
            // authorization header safe check
            const authHeader = req.headers["authorization"] || req.headers["Authorization"];
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.toString().split(" ")[1];
            if (!token)
                throw new AppError_1.default(401, "Unauthorized");
            const decoded = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_ACCESS_SECRET);
            if (!roles.includes(decoded.role)) {
                throw new AppError_1.default(403, "Forbidden");
            }
            req.user = decoded; // TypeScript now recognizes this
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.auth = auth;
//# sourceMappingURL=authMiddleware.js.map