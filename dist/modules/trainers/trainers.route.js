"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const validateRequest_1 = require("../../middlewares/validateRequest");
const trainers_validation_1 = require("./trainers.validation");
const trainers_controller_1 = require("./trainers.controller");
const router = (0, express_1.Router)();
router.post("/", (0, authMiddleware_1.auth)("ADMIN"), // only admin can create trainer
(0, validateRequest_1.validateRequest)(trainers_validation_1.registerTrainerSchema), trainers_controller_1.trainerController.createTrainer);
router.get("/", (0, authMiddleware_1.auth)("ADMIN", "TRAINER"), trainers_controller_1.trainerController.getAllTrainers);
router.get("/:id", (0, authMiddleware_1.auth)("ADMIN", "TRAINER"), trainers_controller_1.trainerController.getTrainerById);
exports.TrainersRoutes = router;
//# sourceMappingURL=trainers.route.js.map