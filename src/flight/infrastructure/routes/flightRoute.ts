import express from "express";
import {createFlightController} from "../dependencies";

export const flightRoute = express.Router();

flightRoute.post("/", createFlightController.run.bind(createFlightController))