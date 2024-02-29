"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationRoute = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
exports.reservationRoute = express_1.default.Router();
exports.reservationRoute.get("/:uuid", dependencies_1.getReservationController.run.bind(dependencies_1.getReservationController));
exports.reservationRoute.post("/", dependencies_1.createReservationController.run.bind(dependencies_1.createReservationController));
exports.reservationRoute.put("/:uuid", dependencies_1.updateReservationController.run.bind(dependencies_1.updateReservationController));
exports.reservationRoute.delete("/:uuid", dependencies_1.deleteReservationController.run.bind(dependencies_1.deleteReservationController));
exports.reservationRoute.post("/check-in/flights", dependencies_1.checkInReservationController.run.bind(dependencies_1.checkInReservationController));
