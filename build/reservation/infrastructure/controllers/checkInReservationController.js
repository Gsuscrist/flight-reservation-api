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
exports.CheckInReservationController = void 0;
class CheckInReservationController {
    constructor(useCase, emailService) {
        this.useCase = useCase;
        this.emailService = emailService;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: GIVE FORMAT TO THE MESSAGE
            try {
                let { uuid } = req.body;
                let checkIn = yield this.useCase.run(uuid);
                if (checkIn) {
                    const passengers = checkIn.passengers;
                    console.log(passengers);
                    const message = `thanks for check-in your reservation, on this email you will find: \n
                Reservation's code: ${uuid}
                Reservation's resume:\n${JSON.stringify(checkIn, null, 2)}
                                              IMPORTANT:
                THIS EMAIL WAS SENT TO ALL THE PASSENGERS FROM THE RESERVATION;
                DO NOT FORGET TO PRINT THIS EMAIL AND GIVE IT TO THE CASHIER THE FLIGHT DATE`;
                    const emailsAddress = new Set();
                    passengers.forEach((passenger) => {
                        emailsAddress.add(passenger.email);
                    });
                    emailsAddress.forEach(mail => {
                        this.emailService.sendEmail(mail, "RESERVATION RESUME CHECK-IN", message);
                    });
                    return res.status(200).send({
                        status: "success",
                        data: [],
                        message: "reservation check-in successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "check in failed, please try again later"
                });
            }
            catch (e) {
                res.status(417).send({
                    status: "error",
                    error: e
                });
            }
        });
    }
}
exports.CheckInReservationController = CheckInReservationController;
