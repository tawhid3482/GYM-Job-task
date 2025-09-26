"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const validateRequest_1 = require("../../middlewares/validateRequest");
const schedule_validation_1 = require("./schedule.validation");
const schedule_controller_1 = require("./schedule.controller");
const router = (0, express_1.Router)();
router.post("/", (0, authMiddleware_1.auth)("ADMIN"), (0, validateRequest_1.validateRequest)(schedule_validation_1.createClassScheduleSchema), schedule_controller_1.classController.createClassSchedule);
router.get("/", (0, authMiddleware_1.auth)("ADMIN", "TRAINER", "TRAINEE"), schedule_controller_1.classController.getAllSchedules);
router.get("/:id", (0, authMiddleware_1.auth)("ADMIN", "TRAINER", "TRAINEE"), schedule_controller_1.classController.getScheduleById);
exports.ScheduleRoutes = router;
//# sourceMappingURL=schedule.route.js.map