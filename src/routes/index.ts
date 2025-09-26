import { Router } from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TrainersRoutes } from "../modules/trainers/trainers.route";
import { ScheduleRoutes } from "../modules/schedules/schedule.route";
import { BookingsRoutes } from "../modules/bookings/bookings.route";


export const router = Router();

const modules = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/trainers",
    route: TrainersRoutes,
  },
  {
    path: "/schedules",
    route: ScheduleRoutes,
  },
  {
    path: "/bookings",
    route: BookingsRoutes,
  },

];

modules.forEach((route) => {
  router.use(route.path, route.route);
});
