import express from "express";
import {
    checkInReservationController,
    createReservationController,
    deleteReservationController,
    getReservationController,
    updateReservationController
} from "../dependencies";
import {authenticateMiddleware} from "../../../middleware/authenticator";


export const reservationRoute = express.Router()

reservationRoute.get("/:uuid",authenticateMiddleware, getReservationController.run.bind(getReservationController))

reservationRoute.post("/",authenticateMiddleware, createReservationController.run.bind(createReservationController))

reservationRoute.put("/:uuid",authenticateMiddleware, updateReservationController.run.bind(updateReservationController))

reservationRoute.delete("/:uuid",authenticateMiddleware, deleteReservationController.run.bind(deleteReservationController))

reservationRoute.post("/check-in/flights",authenticateMiddleware, checkInReservationController.run.bind(checkInReservationController))
