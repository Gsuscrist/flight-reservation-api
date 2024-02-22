import {FlightRepository} from "../../domain/flightRepository";
import {Flight} from "../../domain/entity/flight";


export class UpdateFlightUseCase{
    constructor(readonly repository:FlightRepository) {
    }


    async run(
        uuid:string,
        flight:Flight
    ):Promise<Flight|any>{
        try {
            return await this.repository.updateFlight(uuid,flight);
        }catch (e) {
            console.log(e)
            return null;
        }
    }
}