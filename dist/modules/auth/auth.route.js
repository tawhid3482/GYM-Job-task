"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.loginUserSchema), auth_controller_1.AuthController.loginUser);
exports.AuthRoutes = router;
//# sourceMappingURL=auth.route.js.map