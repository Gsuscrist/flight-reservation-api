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
exports.flightRoute.get("/:uuid", dependencies_1.getFlightController.runByUuid.bind(dependencies_1.getFlightController));
exports.flightRoute.get("/date/:type/:date", dependencies_1.getFlightController.runByDate.bind(dependencies_1.getFlightController));
exports.flightRoute.get("/place/:type/:place", dependencies_1.getFlightController.runByPlace.bind(dependencies_1.getFlightController));
exports.flightRoute.put("/:uuid", dependencies_1.updateFlightController.run.bind(dependencies_1.updateFlightController));
exports.flightRoute.delete("/:uuid", dependencies_1.deleteFlightController.run.bind(dependencies_1.deleteFlightController));
