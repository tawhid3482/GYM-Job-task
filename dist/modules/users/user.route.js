"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.registerUserSchema), user_controller_1.UserController.createUser);
router.get("/me", (0, authMiddleware_1.auth)("ADMIN", "TRAINEE", "TRAINER"), user_controller_1.UserController.getMe);
exports.UserRoutes = router;
//# sourceMappingURL=user.route.js.map