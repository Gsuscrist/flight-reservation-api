import {Passenger} from "./passenger";

export class Reservation{

    constructor(
        readonly uuid:string,
        readonly flightType:'one-way' | 'round-trip',
        readonly luggageType: 'basic' | 'medium' | 'premium',
        readonly departureFlightUuid: string,
        readonly departureSeats: number,
        readonly passengers: Passenger[],
        readonly deletedAt: Date | null,
        readonly checkInAt: Date | null,
        readonly returnFlightUuid?: string,
        readonly returnSeats?: number
    ) {
    }
}