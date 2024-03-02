"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
class Reservation {
    //TODO: ADD CHECKIS_AT COLUMMN IN DATABASE
    constructor(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passagers, deletedAt, checkInAt, returnFlightUuid, returnSeats) {
        this.uuid = uuid;
        this.flightType = flightType;
        this.luggageType = luggageType;
        this.departureFlightUuid = departureFlightUuid;
        this.departureSeats = departureSeats;
        this.passagers = passagers;
        this.deletedAt = deletedAt;
        this.checkInAt = checkInAt;
        this.returnFlightUuid = returnFlightUuid;
        this.returnSeats = returnSeats;
    }
}
exports.Reservation = Reservation;
