import { z } from "zod";
export declare const registerTrainerSchema: z.ZodObject<{
    userId: z.ZodString;
    bio: z.ZodOptional<z.ZodString>;
    specialties: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=trainers.validation.d.ts.map