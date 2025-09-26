"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSources = Object.values(err.errors).map((val) => ({
        field: val.path,
        message: val.message,
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;
//# sourceMappingURL=handleValidationError.js.map