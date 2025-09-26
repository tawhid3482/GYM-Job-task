"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    const keys = Object.keys(err.keyValue);
    const message = `${keys[0]} must be unique.`;
    return {
        statusCode: 400,
        message,
        errorSources: keys.map((key) => ({
            path: key,
            message: `${key} is already in use.`,
        })),
    };
};
exports.handleDuplicateError = handleDuplicateError;
//# sourceMappingURL=handleDuplicateError.js.map