"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const validateRequest_1 = require("../../middlewares/validateRequest");
const bookings_validation_1 = require("./bookings.validation");
const bookings_controller_1 = require("./bookings.controller");
const router = (0, express_1.Router)();
// Trainee booking
router.post("/", (0, authMiddleware_1.auth)("TRAINEE"), (0, validateRequest_1.validateRequest)(bookings_validation_1.createBookingSchema), bookings_controller_1.bookingController.createBooking);
router.patch("/cancel/:bookingId", (0, authMiddleware_1.auth)("TRAINEE"), bookings_controller_1.bookingController.cancelBooking);
// Trainee get my bookings
router.get("/my", (0, authMiddleware_1.auth)("TRAINEE"), bookings_controller_1.bookingController.getMyBookings);
exports.BookingsRoutes = router;
//# sourceMappingURL=bookings.route.js.map