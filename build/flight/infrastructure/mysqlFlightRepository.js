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
    deleteById(uuid) {
        throw new Error("Method not implemented.");
    }
    getByDate(date) {
        throw new Error("Method not implemented.");
    }
    getById(uuid) {
        throw new Error("Method not implemented.");
    }
    updateFlight(uuid, flight) {
        throw new Error("Method not implemented.");
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
