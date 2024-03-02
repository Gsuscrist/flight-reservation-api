import {FlightRepository} from "../../domain/flightRepository";


export class GenerateUuidFlightUseCase {

    constructor(readonly repository:FlightRepository) {
    }
    async run(aeroline:string){
        try {
            return await this.repository.generateUuid(aeroline)
        }catch (e){
            console.log(e)
            return null
        }
    }
}