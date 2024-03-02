"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
class Reservation {
    constructor(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, deletedAt, checkInAt, returnFlightUuid, returnSeats) {
        this.uuid = uuid;
        this.flightType = flightType;
        this.luggageType = luggageType;
        this.departureFlightUuid = departureFlightUuid;
        this.departureSeats = departureSeats;
        this.passengers = passengers;
        this.deletedAt = deletedAt;
        this.checkInAt = checkInAt;
        this.returnFlightUuid = returnFlightUuid;
        this.returnSeats = returnSeats;
    }
}
exports.Reservation = Reservation;
