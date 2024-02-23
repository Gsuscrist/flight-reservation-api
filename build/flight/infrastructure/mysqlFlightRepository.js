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
exports.MysqlFlightRepository = void 0;
const mysql_1 = require("../../database/mysql");
const location_1 = require("../domain/entity/location");
const flight_1 = require("../domain/entity/flight");
class MysqlFlightRepository {
    createFlight(uuid, aeroline, origin, destiny) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //TODO: ADD VALIDATION TO CHECK IF THE UUID IS AVAILABLE
                const sql = "INSERT INTO flights (uuid, aeroline, origin_country, origin_city, origin_airport, origin_terminal, origin_gate, origin_date, destiny_country, destiny_city, destiny_airport, destiny_terminal, destiny_gate, destiny_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                const params = [uuid, aeroline, origin.country, origin.city, origin.airport, origin.terminal, origin.gate, origin.date, destiny.country, destiny.city, destiny.airport, destiny.terminal, destiny.gate, destiny.date];
                const [result] = yield (0, mysql_1.query)(sql, params);
                return new flight_1.Flight(uuid, aeroline, origin, destiny, null);
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
                let sql = "UPDATE flights SET deleted_at= ? WHERE uuid=?";
                let date = new Date();
                let params = [date, uuid];
                const [result] = yield (0, mysql_1.query)(sql, params);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getByDate(date, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql;
                if (type === "departure") {
                    sql = "SELECT * FROM flights WHERE DATE(origin_date) = ? AND deleted_at IS NULL";
                }
                else if (type === "arrive") {
                    sql = "SELECT * FROM flights WHERE DATE(destiny_date) = ? AND deleted_at IS NULL";
                }
                else {
                    throw new Error("type not defined");
                }
                let params = [date];
                let [results] = yield (0, mysql_1.query)(sql, params);
                return results.map((flight) => {
                    const { uuid, aeroline, originCountry, originCity, originAirport, originTerminal, originGate, originDate, destinyCountry, destinyCity, destinyAirport, destinyTerminal, destinyGate, destinyDate } = flight;
                    //TODO: FIX ORIGIN AND DESTINY OBJECT
                    const origin = new location_1.Location(originCountry, originCity, originAirport, originTerminal, originGate, originDate);
                    const destiny = new location_1.Location(destinyCountry, destinyCity, destinyAirport, destinyTerminal, destinyGate, destinyDate);
                    return new flight_1.Flight(uuid, aeroline, origin, destiny, null);
                });
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    getByPlace(place, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql;
                if (type === "departure") {
                    sql = "SELECT * FROM flights WHERE origin_city = ? OR origin_country = ? AND deleted_at IS NULL";
                }
                else if (type === "arrive") {
                    sql = "SELECT * FROM flights WHERE destiny_city =? OR destiny_country= ? AND deleted_at IS NULL";
                }
                else {
                    throw new Error("type not defined");
                }
                let params = [place, place];
                let [results] = yield (0, mysql_1.query)(sql, params);
                return results.map((flight) => {
                    const { uuid, aeroline, originCountry, originCity, originAirport, originTerminal, originGate, originDate, destinyCountry, destinyCity, destinyAirport, destinyTerminal, destinyGate, destinyDate } = flight;
                    //TODO: fix origin destiny object
                    let origin = new location_1.Location(originCountry, originCity, originAirport, originTerminal, originGate, originDate);
                    let destiny = new location_1.Location(destinyCountry, destinyCity, destinyAirport, destinyTerminal, destinyGate, destinyDate);
                    return new flight_1.Flight(uuid, aeroline, origin, destiny, null);
                });
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    getByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "SELECT * FROM flights WHERE uuid = ? AND deleted_at IS NULL";
                let params = [uuid];
                let [results] = yield (0, mysql_1.query)(sql, params);
                const flight = results[0];
                const origin = new location_1.Location(flight.originCountry, flight.originCity, flight.originAirport, flight.originTerminal, flight.originGate, flight.originDate);
                const destiny = new location_1.Location(flight.destinyCountry, flight.destinyCity, flight.destinyAirport, flight.destinyTerminal, flight.destinyGate, flight.destinyDate);
                return new flight_1.Flight(flight.uuid, flight.aeroline, origin, destiny, null);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    updateFlight(uuid, flight) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sql = "UPDATE flights SET aeroline=?, origin_country=?, origin_city =?, origin_airport=?, origin_terminal=?, origin_gate=?, origin_date=?, destiny_country=?, destiny_city=?, destiny_airport=?, destiny_terminal=?, destiny_gate=?, destiny_date=?  WHERE uuid = ?";
                let params = [flight.aeroline, flight.origin.country, flight.origin.city, flight.origin.airport,
                    flight.origin.terminal, flight.origin.gate, flight.origin.date, flight.destiny.country,
                    flight.destiny.city, flight.destiny.airport, flight.destiny.terminal, flight.destiny.gate,
                    flight.destiny.date, uuid];
                let [result] = yield (0, mysql_1.query)(sql, params);
                return flight;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    generateUuid(aeroline) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const namePrefix = aeroline.slice(0, 3).toLowerCase();
                const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
                let result = '';
                for (let i = 0; i < 3; i++) {
                    result += namePrefix[i] + randomNumbers[i];
                }
                result += "-" + aeroline;
                return result;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.MysqlFlightRepository = MysqlFlightRepository;
