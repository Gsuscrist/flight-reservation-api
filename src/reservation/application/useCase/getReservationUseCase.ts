import {ReservationRepository} from "../../domain/reservationRepository";
import {Reservation} from "../../domain/entity/reservation";


export class GetReservationUseCase{

    constructor(readonly repository:ReservationRepository) {
    }

    async run(
        uuid:string
    ):Promise<Reservation|any>{
        try {
            return await this.repository.getByUuid(uuid)
        }catch (e) {
            console.log(e)
            return null;
        }
    }
}