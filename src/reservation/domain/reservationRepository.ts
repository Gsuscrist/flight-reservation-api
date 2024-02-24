import {Reservation} from "./entity/reservation";
import {Passenger} from "./entity/passenger";


export interface ReservationRepository{
    generateUuid(flightType: string):Promise<string|any>
    getByUuid(uuid:string):Promise<Reservation|any>
    update(uuid:string, reservation:Reservation):Promise<Reservation|any>
    deleteByUuid(uuid:string):Promise<void>
    create(
        uuid:string,
        flightType: 'one-way'| 'round-trip',
        luggageType: 'basic' | 'medium' | 'premium',
        departureFlightUuid: string,
        departureSeats: number,
        passengers:Passenger[],
        returnFlightUuid?: string,
        returnSeats?: number,
    ):Promise<Reservation|any>
}