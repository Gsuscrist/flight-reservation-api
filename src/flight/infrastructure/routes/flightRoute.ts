import express from "express";
import {
    createFlightController,
    deleteFlightController,
    getFlightController,
    updateFlightController
} from "../dependencies";
import {authenticateMiddleware} from "../../../middleware/authenticator";

export const flightRoute = express.Router();

flightRoute.post("/",authenticateMiddleware, createFlightController.run.bind(createFlightController))

flightRoute.get("/:uuid",authenticateMiddleware, getFlightController.runByUuid.bind(getFlightController))

flightRoute.get("/date/:type/:date", authenticateMiddleware, getFlightController.runByDate.bind(getFlightController))
flightRoute.get("/place/:type/:place", authenticateMiddleware, getFlightController.runByPlace.bind(getFlightController))


flightRoute.put("/:uuid", authenticateMiddleware, updateFlightController.run.bind(updateFlightController))

flightRoute.delete("/:uuid", authenticateMiddleware, deleteFlightController.run.bind(deleteFlightController))