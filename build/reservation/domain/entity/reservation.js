"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
class Reservation {
    //TODO: ADD CHECKIN_AT
    constructor(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passagers, deletedAt, returnFlightUuid, returnSeats) {
        this.uuid = uuid;
        this.flightType = flightType;
        this.luggageType = luggageType;
        this.departureFlightUuid = departureFlightUuid;
        this.departureSeats = departureSeats;
        this.passagers = passagers;
        this.deletedAt = deletedAt;
        this.returnFlightUuid = returnFlightUuid;
        this.returnSeats = returnSeats;
    }
}
exports.Reservation = Reservation;
