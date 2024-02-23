"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightRoute = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
exports.flightRoute = express_1.default.Router();
exports.flightRoute.post("/", dependencies_1.createFlightController.run.bind(dependencies_1.createFlightController));
