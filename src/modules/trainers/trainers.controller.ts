import { Request, Response, NextFunction } from "express";
import { trainerServices } from "./trainers.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

export const trainerController = {
  createTrainer: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const trainer = await trainerServices.createTrainer(req.body);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Trainer created successfully",
        data: [trainer],
      });
    }
  ),

  getAllTrainers: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const trainers = await trainerServices.getAllTrainers();

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Trainers fetched successfully",
        data: trainers,
      });
    }
  ),

  getTrainerById: catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      if (!id) {
        return next(new Error("Trainer id is required"));
      }
      const trainer = await trainerServices.getTrainerById(id);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Trainer fetched successfully",
        data: [trainer],
      });
    }
  ),
};
