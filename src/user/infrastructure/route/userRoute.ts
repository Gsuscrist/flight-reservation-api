import express from "express";
import {
    createUserController,
    deleteUserController,
    getUserController,
    loginUserController,
    updateUserController
} from "../dependencies";

export const userRoute = express.Router();


userRoute.get("/:uuid", getUserController.run.bind(getUserController))
userRoute.post("/login", loginUserController.run.bind(loginUserController))
userRoute.post("/", createUserController.run.bind(createUserController))
userRoute.put("/:uuid", updateUserController.run.bind(updateUserController))
userRoute.delete("/:uuid", deleteUserController.run.bind(deleteUserController))