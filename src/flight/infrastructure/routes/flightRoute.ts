import express from "express";
import {
    createFlightController,
    deleteFlightController,
    getFlightController,
    updateFlightController
} from "../dependencies";

export const flightRoute = express.Router();

flightRoute.post("/", createFlightController.run.bind(createFlightController))

flightRoute.get("/:uuid", getFlightController.runByUuid.bind(getFlightController))

flightRoute.get("/date/:type/:date",getFlightController.runByDate.bind(getFlightController))
flightRoute.get("/place/:type/:place", getFlightController.runByPlace.bind(getFlightController))


flightRoute.put("/:uuid", updateFlightController.run.bind(updateFlightController))

flightRoute.delete("/:uuid", deleteFlightController.run.bind(deleteFlightController))