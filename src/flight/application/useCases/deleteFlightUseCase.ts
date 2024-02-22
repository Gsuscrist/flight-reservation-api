import {FlightRepository} from "../../domain/flightRepository";
import {Flight} from "../../domain/entity/flight";


export class DeleteFlightUseCase{
    constructor(readonly repository:FlightRepository) {
    }

    async run(
        uuid:string
    ):Promise<Flight|any>{
        try {
            return await this.repository.deleteById(uuid);
        }catch (e){
            console.log(e)
            return null;
        }
    }
}