"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/users/user.route");
exports.router = (0, express_1.Router)();
const modules = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
];
modules.forEach((route) => {
    exports.router.use(route.path, route.route);
});
//# sourceMappingURL=index.js.map