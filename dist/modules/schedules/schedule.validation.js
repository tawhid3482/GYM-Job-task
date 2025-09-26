"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassScheduleSchema = void 0;
const zod_1 = require("zod");
exports.createClassScheduleSchema = zod_1.z.object({
    trainerId: zod_1.z.string().min(1, "Trainer ID is required"),
    date: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    startTime: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start time format",
    }),
});
//# sourceMappingURL=schedule.validation.js.map