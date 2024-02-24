import {ReservationRepository} from "../../domain/reservationRepository";
import {Reservation} from "../../domain/entity/reservation";


export class UpdateReservationUseCase{

    constructor(readonly repository:ReservationRepository) {
    }

    async run(
        uuid:string,
        reservation:Reservation
    ):Promise<Reservation|any>{
        try {
            return await this.repository.update(uuid, reservation)
        }catch (e) {
            console.log(e)
            return null;
        }
    }
}