import {Reservation} from "./domain/entity/reservation";
import {Passanger} from "./domain/entity/passanger";


export interface ReservationRepository{
    getByUuid(uuid:string):Promise<Reservation|any>
    update(uuid:string, reservation:Reservation):Promise<Reservation|any>
    deleteByUuid(uuid:string):Promise<void>
    create(
        uuid:string,
        flightType: 'one-way'| 'round-trip',
        luggageType: 'basic' | 'medium' | 'premium',
        departureFlightUuid: string,
        departureSeats: number,
        passagers:Passanger[],
        returnFlightUuid?: string,
        returnSeats?: number,
    ):Promise<Reservation|any>
}