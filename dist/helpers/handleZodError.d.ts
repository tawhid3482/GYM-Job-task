import { ZodError } from "zod";
import { TErrorSources } from "../types/error";
export declare const handleZodError: (err: ZodError) => {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
};
//# sourceMappingURL=handleZodError.d.ts.map