import {ReservationRepository} from "../../domain/reservationRepository";
import {Reservation} from "../../domain/entity/reservation";

export class CheckInReservationUseCase{

    constructor(readonly repository:ReservationRepository) {
    }

    async run(uuid:string):Promise<Reservation|any>{
        try {
            return await this.repository.checkIn(uuid);
        }catch (e) {
            console.log(e)
            return null
        }
    }

}