export default class AppError extends Error {
    statusCode: number;
    errorDetails?: any;
    constructor(statusCode: number, message: string, errorDetails?: any, stack?: string);
}
//# sourceMappingURL=AppError.d.ts.map