import {ReservationRepository} from "../../domain/reservationRepository";
import {Passenger} from "../../domain/entity/passenger";
import {Reservation} from "../../domain/entity/reservation";

export class CreateReservationUseCase{

    constructor(readonly repository:ReservationRepository) {
    }

    async run(
        uuid:string,
        flightType: 'one-way'| 'round-trip',
        luggageType: 'basic' | 'medium' | 'premium',
        departureFlightUuid: string,
        departureSeats: number,
        passengers:Passenger[],
        returnFlightUuid?: string,
        returnSeats?: number,
    ):Promise<Reservation|any>{
        try {
            return await this.repository.create(uuid,flightType,luggageType,departureFlightUuid,
                departureSeats,passengers,returnFlightUuid,returnSeats)
        }catch (e){
            console.log(e)
            return null;
        }
    }
}