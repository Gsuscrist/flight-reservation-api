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
exports.CreateReservationController = void 0;
class CreateReservationController {
    constructor(useCase, uuid, emailService) {
        this.useCase = useCase;
        this.uuid = uuid;
        this.emailService = emailService;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: SEND A PRICE REFERENCE
            try {
                let { flightType, luggageType, departureFlightUuid, departureSeats, passengers, returnFlightUuid, returnSeats } = req.body;
                let uuid = yield this.uuid.run(flightType);
                let createdReservation = yield this.useCase.run(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, returnFlightUuid, returnSeats);
                if (createdReservation) {
                    const verificationURL = `http://localhost:8080/reservation/check-in/flights`;
                    const message = `thanks for your reservation, on this email you will find: \n
                Check-in link: ${verificationURL}
                Reservation's code: ${uuid}
    
                HOW TO CHECK-IN: 
                access the link and send your reservation code 
                
                IMPORTANT:
                THIS EMAIL WAS SENT TO ALL THE PASSENGERS FROM THE RESERVATION, AT LEAST ONE PASSENGER MUST DO THE CHECK-IN.
                YOU HAVE TO CHECK-IN TO GUARANTEE YOUR SPACE(S) IN THE FLIGHT `;
                    const emailsAddress = new Set();
                    passengers.forEach((passenger) => {
                        emailsAddress.add(passenger.email);
                    });
                    emailsAddress.forEach(mail => {
                        this.emailService.sendEmail(mail, "RESERVATION IMPORTANT RESUME", message);
                    });
                    return res.status(201).send({
                        status: "success",
                        data: createdReservation,
                        message: "Reservation creation successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "Reservation creation failed"
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
exports.CreateReservationController = CreateReservationController;
