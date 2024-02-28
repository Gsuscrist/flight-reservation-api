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
exports.MysqlReservationRepository = void 0;
const mysql_1 = require("../../database/mysql");
const reservation_1 = require("../domain/entity/reservation");
class MysqlReservationRepository {
    create(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, returnFlightUuid, returnSeats) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isValid = false;
                if (departureFlightUuid !== null) {
                    let verificationSql = "SELECT * FROM flights WHERE uuid = ? AND deleted_at IS NULL";
                    let verificationParams = [departureFlightUuid];
                    let [verificationResults] = yield (0, mysql_1.query)(verificationSql, verificationParams);
                    if (verificationResults.length > 0) {
                        isValid = true;
                    }
                    else {
                        throw new Error("flight uuid invalid");
                    }
                }
                else if (returnFlightUuid !== null) {
                    isValid = false;
                    let verification2Sql = "SELECT * FROM flights WHERE uuid = ? AND deleted_at IS NULL";
                    let verification2Params = [departureFlightUuid];
                    let [verification2Results] = yield (0, mysql_1.query)(verification2Sql, verification2Params);
                    if (verification2Results.length > 0) {
                        isValid = true;
                    }
                    else {
                        throw new Error("flight uuid invalid");
                    }
                }
                //TODO: MOVE THIS VALIDATIONS TO DOMAIN LAYER
                if (returnSeats !== passengers.length || departureSeats !== passengers.length && departureSeats !== null) {
                    throw new Error("Please include all passangers information");
                    isValid = false;
                }
                else {
                    isValid = true;
                }
                if (isValid) {
                    let sql = "INSERT INTO reservations (uuid,flight_type, luggage_type, departure_flight_uuid,departure_seats, passengers, return_flight_uuid, return_seats) values(?,?,?,?,?,?,?,?)";
                    let params = [uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, returnFlightUuid, returnSeats];
                    const [results] = yield (0, mysql_1.query)(sql, params);
                    if (results) {
                        return new reservation_1.Reservation(uuid, flightType, luggageType, departureFlightUuid, departureSeats, passengers, null, returnFlightUuid, returnSeats);
                    }
                }
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    deleteByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "UPDATE reservations SET deleted_at = ? WHERE uuid = ?";
                let date = new Date();
                let params = [date, uuid];
                const [results] = yield (0, mysql_1.query)(sql, params);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "SELECT * FROM reservations WHERE uuid=?";
                let params = [uuid];
                const [results] = yield (0, mysql_1.query)(sql, params);
                if (results) {
                    let result = results[0];
                    console.log(result);
                    return new reservation_1.Reservation(result.uuid, result.flight_type, result.luggage_type, result.departure_flight_uuid, result.departure_seats, JSON.parse(result.passengers), null, result.return_flight_uuid, result.return_seats);
                }
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    update(uuid, reservation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "UPDATE reservations SET flight_type =?, luggage_type=?, departure_flight_uuid=?, departure_seats =?, passengers=?, return_flight_uuid=?, return_seats=? WHERE uuid=?";
                let params = [reservation.flightType, reservation.luggageType, reservation.departureFlightUuid, reservation.departureSeats, reservation.passagers, reservation.returnFlightUuid, reservation.returnSeats, uuid];
                const [results] = yield (0, mysql_1.query)(sql, params);
                if (results) {
                    return reservation;
                }
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    generateUuid(flightType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const namePrefix = flightType.slice(0, 4).toLowerCase();
                const randomNumbers = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
                let result = '';
                for (let i = 0; i < 4; i++) {
                    result += randomNumbers[i] + namePrefix[i] + randomNumbers[i + 1];
                }
                return result;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.MysqlReservationRepository = MysqlReservationRepository;
