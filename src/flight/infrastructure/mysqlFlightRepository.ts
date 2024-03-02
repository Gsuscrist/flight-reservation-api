import {query} from "../../database/mysql";
import {FlightRepository} from "../domain/flightRepository";
import {Location} from "../domain/entity/location";
import {Flight} from "../domain/entity/flight";


export class MysqlFlightRepository implements FlightRepository{
    async createFlight(uuid: string, aeroline: string, origin: Location, destiny: Location): Promise<any> {
        try {
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

    async getByDate(date: string, type:string): Promise<Flight[]|any> {
        try {
            let sql:string;
            if (type ==="departure"){
                sql = "SELECT * FROM flights WHERE DATE(origin_date) = ? AND deleted_at IS NULL"
            }else if(type==="arrive"){
                sql = "SELECT * FROM flights WHERE DATE(destiny_date) = ? AND deleted_at IS NULL"
            }else{
                throw new Error("type not defined")
            }
            let params:any[]=[date]
            let [results]:any = await query(sql,params)

            return results.map((flight:{uuid:any, aeroline:any, origin_country:any,origin_city:any,origin_airport:any,
                origin_terminal:any,origin_gate:any,origin_date:any, destiny_country:any, destiny_city:any,
                destiny_airport:any, destiny_terminal:any, destiny_gate:any, destiny_date:any})=>{
                const {uuid,aeroline,origin_country,origin_city,origin_airport,origin_terminal,origin_gate,origin_date,
                    destiny_country,destiny_city,destiny_airport,destiny_terminal,destiny_gate,destiny_date}=flight
                const origin = new Location(origin_country, origin_city, origin_airport, origin_terminal, origin_gate, origin_date)
                const destiny = new Location(destiny_country, destiny_city, destiny_airport, destiny_terminal, destiny_gate, destiny_date)
                return new Flight(uuid,aeroline,origin,destiny,null)
            })
        }catch (e) {
            console.log(e)
            return null
        }
    }

    async getByPlace(place:string, type:string): Promise<Flight[]|any> {
        try {
            let sql:string;
            if (type ==="departure"){
                sql = "SELECT * FROM flights WHERE origin_city = ? OR origin_country = ? AND deleted_at IS NULL"
            }else if(type==="arrive"){
                sql = "SELECT * FROM flights WHERE destiny_city =? OR destiny_country= ? AND deleted_at IS NULL"
            }else{
                throw new Error("type not defined")
            }
            let params:any[]=[place,place]
            let [results]:any = await query(sql,params)

            return results.map((flight:{uuid:any, aeroline:any, origin_country:any,origin_city:any,origin_airport:any,
                origin_terminal:any,origin_gate:any,origin_date:any, destiny_country:any, destiny_city:any,
                destiny_airport:any, destiny_terminal:any, destiny_gate:any, destiny_date:any})=>{
                const {uuid,aeroline,origin_country,origin_city,origin_airport,origin_terminal,origin_gate,origin_date,
                    destiny_country,destiny_city,destiny_airport,destiny_terminal,destiny_gate,destiny_date}=flight
                const origin = new Location(origin_country, origin_city, origin_airport, origin_terminal, origin_gate, origin_date)
                const destiny = new Location(destiny_country, destiny_city, destiny_airport, destiny_terminal, destiny_gate, destiny_date)
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
            const origin = new Location(flight.origin_country, flight.origin_city, flight.origin_airport, flight.origin_terminal, flight.origin_gate, flight.origin_date)
            const destiny = new Location(flight.destiny_country, flight.destiny_city, flight.destiny_airport, flight.destiny_terminal, flight.destiny_gate, flight.destiny_date)

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
            let result;
            do {
                const namePrefix = aeroline.slice(0, 3).toLowerCase();
                const randomNumbers = Array.from({ length: 3 }, () =>
                    Math.floor(Math.random() * 10));
                result = '';
                for (let i = 0; i < 3; i++) {
                    result += namePrefix[i] + randomNumbers[i];
                }
                result += "-" + aeroline;
            } while (await this.getByUuid(result));

            return result;
        }catch (e){
            console.log(e)
        }
    }


}