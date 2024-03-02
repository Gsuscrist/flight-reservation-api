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
exports.CreateReservationUseCase = void 0;
class CreateReservationUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    run(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, returnFlightUuid, returnSeats) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.create(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, returnFlightUuid, returnSeats);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
}
exports.CreateReservationUseCase = CreateReservationUseCase;
