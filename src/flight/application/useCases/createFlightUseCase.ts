import {FlightRepository} from "../../domain/flightRepository";
import {Location} from "../../domain/entity/location";
import {Flight} from "../../domain/entity/flight";


export class CreateFlightUseCase{
    constructor(readonly repository:FlightRepository) {
    }

    async run(
        uuid:string,
        aeroline:string,
        origin:Location,
        destiny:Location,
    ):Promise<Flight|any>{
        try {
            return await this.repository.createFlight(uuid,aeroline,origin,destiny)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}