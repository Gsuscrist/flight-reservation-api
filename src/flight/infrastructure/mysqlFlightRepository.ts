import {FlightRepository} from "../domain/flightRepository";
import {Location} from "../domain/entity/location";
import {Flight} from "../domain/entity/flight";


export class MysqlFlightRepository implements FlightRepository{
    createFlight(uuid: string, aeroline: string, origin: Location, destiny: Location): Promise<any> {
        throw new Error("Method not implemented.");
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


}