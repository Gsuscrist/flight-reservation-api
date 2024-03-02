import express from "express";
import {
    checkInReservationController,
    createReservationController,
    deleteReservationController,
    getReservationController,
    updateReservationController
} from "../dependencies";


export const reservationRoute = express.Router()

reservationRoute.get("/:uuid", getReservationController.run.bind(getReservationController))

reservationRoute.post("/",createReservationController.run.bind(createReservationController))

reservationRoute.put("/:uuid",updateReservationController.run.bind(updateReservationController))

reservationRoute.delete("/:uuid",deleteReservationController.run.bind(deleteReservationController))

reservationRoute.post("/check-in/flights", checkInReservationController.run.bind(checkInReservationController))
