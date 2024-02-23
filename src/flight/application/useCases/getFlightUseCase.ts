import {FlightRepository} from "../../domain/flightRepository";
import {Flight} from "../../domain/entity/flight";


export class GetFlightUseCase{
    constructor(readonly repository:FlightRepository) {
    }

    async runByUuid(
        uuid:string
    ):Promise<Flight|any>{
        try {
            return await this.repository.getByUuid(uuid);
        }catch (e) {
            console.log(e)
            return null;
        }
    }

    async runByOriginDate(
        date:Date
    ):Promise<Flight|any>{
        try {
            return await this.repository.getByOriginDate(date);
        }catch (e) {
            console.log(e)
            return null;
        }
    }


    async runByDestinyDate(
        date:Date
    ):Promise<Flight|any>{
        try {
            return await this.repository.getByDestinyDate(date);
        }catch (e) {
            console.log(e)
            return null;
        }
    }
}