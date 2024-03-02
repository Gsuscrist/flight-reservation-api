"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReservationController = void 0;
const reservation_1 = require("../../domain/entity/reservation");
class UpdateReservationController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let uuid = req.params.uuid;
                let { flightType, luggageType, departureFlightUuid, departureSeats, passengers, returnFlightUuid, returnSeats } = req.body;
                const reservation = new reservation_1.Reservation(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, null, null, returnFlightUuid, returnSeats);
                let updatedReservation = yield this.useCase.run(uuid, reservation);
                if (updatedReservation) {
                    return res.status(200).send({
                        status: "success",
                        data: updatedReservation,
                        message: "Reservation updating successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "Reservation updating failed"
                });
            }
            catch (e) {
                console.log(e);
                res.status(417).send({
                    status: "error",
                    error: e
                });
            }
        });
    }
}
exports.UpdateReservationController = UpdateReservationController;
