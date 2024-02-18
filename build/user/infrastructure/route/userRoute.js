"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
exports.userRoute = express_1.default.Router();
exports.userRoute.get("/:uuid", dependencies_1.getUserController.run.bind(dependencies_1.getUserController));
exports.userRoute.post("/login", dependencies_1.loginUserController.run.bind(dependencies_1.loginUserController));
exports.userRoute.post("/", dependencies_1.createUserController.run.bind(dependencies_1.createUserController));
exports.userRoute.put("/:uuid", dependencies_1.updateUserController.run.bind(dependencies_1.updateUserController));
exports.userRoute.delete("/:uuid", dependencies_1.deleteUserController.run.bind(dependencies_1.deleteUserController));
