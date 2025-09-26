"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/users/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const trainers_route_1 = require("../modules/trainers/trainers.route");
const schedule_route_1 = require("../modules/schedules/schedule.route");
const bookings_route_1 = require("../modules/bookings/bookings.route");
exports.router = (0, express_1.Router)();
const modules = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/trainers",
        route: trainers_route_1.TrainersRoutes,
    },
    {
        path: "/schedules",
        route: schedule_route_1.ScheduleRoutes,
    },
    {
        path: "/bookings",
        route: bookings_route_1.BookingsRoutes,
    },
];
modules.forEach((route) => {
    exports.router.use(route.path, route.route);
});
//# sourceMappingURL=index.js.map