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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../helpers/AppError"));
const env_1 = require("../../config/env");
const prisma = new client_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existing)
        throw new AppError_1.default(400, "Email already registered");
    const hashedPassword = yield bcryptjs_1.default.hash(data.password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const user = yield prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: "TRAINEE",
        },
    });
    // hide password
    const { password } = user, safeUser = __rest(user, ["password"]);
    return safeUser;
});
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    // hide password
    const { password } = user, safeUser = __rest(user, ["password"]);
    return safeUser;
});
exports.userServices = {
    createUser,
    getMe,
};
//# sourceMappingURL=user.service.js.map