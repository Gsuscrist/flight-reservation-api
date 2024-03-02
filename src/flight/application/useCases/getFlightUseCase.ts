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

    async runByDate(
        date:string,
        type:string
    ):Promise<Flight[]|any>{
        try {
            return await this.repository.getByDate(date,type);
        }catch (e) {
            console.log(e)
            return null;
        }
    }


    async runByPlace(
        place:string,
        type:string,
    ):Promise<Flight[]|any>{
        try {
            return await this.repository.getByPlace(place,type);
        }catch (e) {
            console.log(e)
            return null;
        }
    }
}