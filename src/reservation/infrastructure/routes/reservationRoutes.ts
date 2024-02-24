import express from "express";
import {
    createReservationController,
    deleteReservationController,
    getReservationController,
    updateReservationController
} from "../dependencies";


export const reservationRoutes = express.Router()

reservationRoutes.get("/:uuid", getReservationController.run.bind(getReservationController))

reservationRoutes.post("/",createReservationController.run.bind(createReservationController))

reservationRoutes.put("/:uuid",updateReservationController.run.bind(updateReservationController))

reservationRoutes.delete("/:uuid",deleteReservationController.run.bind(deleteReservationController))
