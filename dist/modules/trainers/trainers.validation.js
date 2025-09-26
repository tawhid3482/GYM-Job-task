"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTrainerSchema = void 0;
const zod_1 = require("zod");
exports.registerTrainerSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID is required"),
    bio: zod_1.z.string().optional(),
    specialties: zod_1.z.array(zod_1.z.string()).min(1, "At least one specialty is required"),
});
//# sourceMappingURL=trainers.validation.js.map