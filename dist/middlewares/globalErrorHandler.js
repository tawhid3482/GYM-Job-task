"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const handleDuplicateError_1 = require("../helpers/handleDuplicateError");
const handleCastError_1 = require("../helpers/handleCastError");
const handleZodError_1 = require("../helpers/handleZodError");
const handleValidationError_1 = require("../helpers/handleValidationError");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = null;
    // Duplicate error
    if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = ((_a = simplifiedError.errorSources) === null || _a === void 0 ? void 0 : _a.length)
            ? simplifiedError.errorSources
            : { field: Object.keys(err.keyValue)[0], message: "Already exists." };
    }
    // Cast / ObjectId error
    else if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorSources;
    }
    // Zod validation error
    else if (err.name === "ZodError") {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorSources;
    }
    // Mongoose validation error
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorDetails = simplifiedError.errorSources;
    }
    // Custom AppError
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err.errorDetails || null;
    }
    // Generic JS error
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
        errorDetails = null;
    }
    res.status(statusCode).json({
        success: statusCode < 400 ? true : false,
        message,
        errorDetails,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : undefined,
    });
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map