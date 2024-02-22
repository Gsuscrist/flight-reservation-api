import {FlightRepository} from "../../domain/flightRepository";
import {Flight} from "../../domain/entity/flight";


export class GetFlightUseCase{
    constructor(readonly repository:FlightRepository) {
    }

    async runByUuid(
        uuid:string
    ):Promise<Flight|any>{
        try {
            return await this.repository.getById(uuid);
        }catch (e) {
            console.log(e)
            return null;
        }
    }

    async runByDate(
        date:Date
    ):Promise<Flight|any>{
        try {
            return await this.repository.getByDate(date);
        }catch (e) {
            console.log(e)
            return null;
        }
    }
}