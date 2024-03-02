import {ReservationRepository} from "../../domain/reservationRepository";
import e from "express";

export class DeleteReservationUseCase{

    constructor(readonly repository:ReservationRepository) {
    }

    async run(
        uuid:string
    ):Promise<void>{
        try {
            return await this.repository.deleteByUuid(uuid)
        }catch (e) {
            console.log(e)
        }
    }
}