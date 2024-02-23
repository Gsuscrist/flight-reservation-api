"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signale_1 = require("signale");
const userRoute_1 = require("./user/infrastructure/routes/userRoute");
const flightRoute_1 = require("./flight/infrastructure/routes/flightRoute");
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
app.use(express_1.default.json());
app.use('/user', userRoute_1.userRoute);
app.use('/flight', flightRoute_1.flightRoute);
app.listen(8080, () => {
    signale.success("Server on line in port: 8080");
});
