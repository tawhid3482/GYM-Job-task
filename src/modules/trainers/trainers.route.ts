import { Router } from "express";
import { auth } from "../../middlewares/authMiddleware";
import { validateRequest } from "../../middlewares/validateRequest";
import { registerTrainerSchema } from "./trainers.validation";
import { trainerController } from "./trainers.controller";

const router = Router();

router.post(
  "/",
  auth("ADMIN"), // only admin can create trainer
  validateRequest(registerTrainerSchema),
  trainerController.createTrainer
);

router.get("/", auth("ADMIN", "TRAINER"), trainerController.getAllTrainers);

router.get("/:id", auth("ADMIN", "TRAINER"), trainerController.getTrainerById);

export const TrainersRoutes = router;
