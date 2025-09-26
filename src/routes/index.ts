import { Router } from "express";
import { UserRoutes } from "../modules/users/user.route";


export const router = Router();

const modules = [
  {
    path: "/users",
    route: UserRoutes,
  },

];

modules.forEach((route) => {
  router.use(route.path, route.route);
});
