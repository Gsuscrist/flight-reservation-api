import {query} from "../../database/mysql";
import {FlightRepository} from "../domain/flightRepository";
import {Location} from "../domain/entity/location";
import {Flight} from "../domain/entity/flight";


export class MysqlFlightRepository implements FlightRepository{
    async createFlight(uuid: string, aeroline: string, origin: Location, destiny: Location): Promise<any> {
        try {
            //TODO: ADD VALIDATION TO CHECK IF THE UUID IS AVAILABLE
            const sql = "INSERT INTO flights (uuid, aeroline, origin_country, origin_city, origin_airport, origin_terminal, origin_gate, origin_date, destiny_country, destiny_city, destiny_airport, destiny_terminal, destiny_gate, destiny_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            const params:any[] = [uuid,aeroline,origin.country,origin.city,origin.airport,origin.terminal,origin.gate,origin.gate, destiny.country,destiny.city,destiny.airport, destiny.terminal, destiny.gate, destiny.date]
            const [result]:any = await query(sql,params)
            return new Flight(uuid, aeroline, origin, destiny, null)
        }catch (e){
            console.log(e)
            return null;
        }
    }

    deleteById(uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getByDate(date: Date): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getById(uuid: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    updateFlight(uuid: string, flight: Flight): Promise<any> {
        throw new Error("Method not implemented.");
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