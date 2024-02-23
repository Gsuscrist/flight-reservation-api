import {query} from "../../database/mysql";
import {FlightRepository} from "../domain/flightRepository";
import {Location} from "../domain/entity/location";
import {Flight} from "../domain/entity/flight";


export class MysqlFlightRepository implements FlightRepository{
    async createFlight(uuid: string, aeroline: string, origin: Location, destiny: Location): Promise<any> {
        try {
            //TODO: ADD VALIDATION TO CHECK IF THE UUID IS AVAILABLE
            const sql = "INSERT INTO flights (uuid, aeroline, origin_country, origin_city, origin_airport, origin_terminal, origin_gate, origin_date, destiny_country, destiny_city, destiny_airport, destiny_terminal, destiny_gate, destiny_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params:any[] = [uuid,aeroline,origin.country,origin.city,origin.airport,origin.terminal,origin.gate,origin.date, destiny.country,destiny.city,destiny.airport, destiny.terminal, destiny.gate, destiny.date]
            const [result]:any = await query(sql,params)
            return new Flight(uuid, aeroline, origin, destiny, null)
        }catch (e){
            console.log(e)
            return null;
        }
    }

    async deleteByUuid(uuid: string): Promise<void> {
        try {
            let sql="UPDATE flights SET deleted_at= ? WHERE uuid=?"
            let date = new Date()
            let params:any[]=[date,uuid]
            const [result]:any = await query(sql,params)
        }catch (e) {
            console.log(e)
        }
    }

    async getByOriginDate(date: Date): Promise<Flight[]|any> {
        try {
            let sql = "SELECT * FROM flights WHERE DATE(origin_date) = ? AND deleted_at IS NULL"
            let params:any[]=[date]
            let [results]:any = await query(sql,params)

            return results.map((flight:{uuid:any, aeroline:any, originCountry:any,originCity:any,originAirport:any,
                originTerminal:any,originGate:any,originDate:any, destinyCountry:any, destinyCity:any,
                destinyAirport:any, destinyTerminal:any, destinyGate:any, destinyDate:any})=>{
                const {uuid,aeroline,originCountry,originCity,originAirport,originTerminal,originGate,originDate,
                    destinyCountry,destinyCity,destinyAirport,destinyTerminal,destinyGate,destinyDate}=flight

                const origin = new Location(originCountry, originCity, originAirport, originTerminal, originGate, originDate)
                const destiny = new Location(destinyCountry, destinyCity, destinyAirport, destinyTerminal, destinyGate, destinyDate)
                return new Flight(uuid,aeroline,origin,destiny,null)
            })
        }catch (e) {
            console.log(e)
            return null
        }
    }

    async getByDestinyDate(date: Date): Promise<Flight[]|any> {
        try {
            let sql = "SELECT * FROM flights WHERE DATE(destiny_date) = ? AND deleted_at IS NULL"
            let params:any[]=[date]
            let [results]:any = await query(sql,params)

            return results.map((flight:{uuid:any, aeroline:any, originCountry:any,originCity:any,originAirport:any,
                originTerminal:any,originGate:any,originDate:any, destinyCountry:any, destinyCity:any,
                destinyAirport:any, destinyTerminal:any, destinyGate:any, destinyDate:any})=>{
                const {uuid,aeroline,originCountry,originCity,originAirport,originTerminal,originGate,originDate,
                    destinyCountry,destinyCity,destinyAirport,destinyTerminal,destinyGate,destinyDate}=flight

                const origin = new Location(originCountry, originCity, originAirport, originTerminal, originGate, originDate)
                const destiny = new Location(destinyCountry, destinyCity, destinyAirport, destinyTerminal, destinyGate, destinyDate)
                return new Flight(uuid,aeroline,origin,destiny,null)
            })
        }catch (e) {
            console.log(e)
            return null
        }
    }

    async getByUuid(uuid: string): Promise<any> {
        try {
            let sql = "SELECT * FROM flights WHERE uuid = ? AND deleted_at IS NULL"
            let params:any[]=[uuid]
            let [results]:any = await query(sql,params)
            const flight = results[0]
            const origin = new Location(flight.originCountry, flight.originCity, flight.originAirport, flight.originTerminal, flight.originGate, flight.originDate)
            const destiny = new Location(flight.destinyCountry, flight.destinyCity, flight.destinyAirport, flight.destinyTerminal, flight.destinyGate, flight.destinyDate)

            return new Flight(flight.uuid,flight.aeroline,origin,destiny,null)
        }catch (e) {
            console.log(e)
            return null
        }
    }

    async updateFlight(uuid: string, flight: Flight): Promise<any> {
        try {
            let sql = "UPDATE flights SET aeroline=?, origin_country=?, origin_city =?, origin_airport=?, origin_terminal=?, origin_gate=?, origin_date=?, destiny_country=?, destiny_city=?, destiny_airport=?, destiny_terminal=?, destiny_gate=?, destiny_date=?  WHERE uuid = ?"
            let params:any[] = [flight.aeroline,flight.origin.country,flight.origin.city,flight.origin.airport
                ,flight.origin.terminal,flight.origin.gate,flight.origin.date, flight.destiny.country,
                flight.destiny.city,flight.destiny.airport,flight.destiny.terminal,flight.destiny.gate,
                flight.destiny.date,uuid]

            let [result]:any= await query(sql,params)

            return flight;

        }catch (e) {
            console.log(e)
            return null
        }
    }

    async generateUuid(aeroline: string):Promise<string|any>{
        try {
            const namePrefix = aeroline.slice(0, 3).toLowerCase();
            const randomNumbers = Array.from({ length: 3 }, () =>
                Math.floor(Math.random() * 10));
            let result = '';
            for (let i = 0; i < 3; i++) {
                result += namePrefix[i] + randomNumbers[i];
            }
            result +="-"+aeroline

            return result;
        }catch (e){
            console.log(e)
        }
    }


}