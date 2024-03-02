import express from "express";
import {authenticateMiddleware} from "../../../middleware/authenticator";
import {
    createUserController,
    deleteUserController,
    getUserController,
    loginUserController,
    updateUserController
} from "../dependencies";

export const userRoute = express.Router();


userRoute.post("/login", loginUserController.run.bind(loginUserController))
userRoute.post("/", createUserController.run.bind(createUserController))

userRoute.get("/:uuid",authenticateMiddleware, getUserController.run.bind(getUserController))
userRoute.put("/:uuid",authenticateMiddleware, updateUserController.run.bind(updateUserController))
userRoute.delete("/:uuid",authenticateMiddleware, deleteUserController.run.bind(deleteUserController))