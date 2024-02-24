import {ReservationRepository} from "../../domain/reservationRepository";


export class GenerateUuidReservationUseCase {
    constructor(readonly repository:ReservationRepository) {
    }

    async run(flightType:string){
        try {
            return await this.repository.generateUuid(flightType)
        }catch (e){
            console.log(e)
            return null
        }
    }


}