import {Passenger} from "./passenger";

export class Reservation{

    //TODO: ADD CHECKIS_AT COLUMMN IN DATABASE
    constructor(
        readonly uuid:string,
        readonly flightType:'one-way' | 'round-trip',
        readonly luggageType: 'basic' | 'medium' | 'premium',
        readonly departureFlightUuid: string,
        readonly departureSeats: number,
        readonly passagers: Passenger[],
        readonly deletedAt: Date | null,
        readonly checkInAt: Date | null,
        readonly returnFlightUuid?: string,
        readonly returnSeats?: number
    ) {
    }
}