"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const schedule_service_1 = require("./schedule.service");
const AppError_1 = __importDefault(require("../../helpers/AppError"));
exports.classController = {
    createClassSchedule: (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.user.id;
        const schedule = yield schedule_service_1.classServices.createClassSchedule(id, req.body);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.CREATED,
            success: true,
            message: "Class schedule created successfully",
            data: [schedule],
        });
    })),
    getAllSchedules: (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const schedules = yield schedule_service_1.classServices.getAllSchedules();
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Schedules fetched successfully",
            data: schedules,
        });
    })),
    getScheduleById: (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            throw new AppError_1.default(404, "Id is required");
        }
        const schedule = yield schedule_service_1.classServices.getScheduleById(id);
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "Schedule fetched successfully",
            data: [schedule],
        });
    })),
};
//# sourceMappingURL=schedule.controller.js.map