import {Passanger} from "./passanger";

export class Reservation{

    constructor(
        readonly uuid:string,
        readonly flightType:'one-way' | 'round-trip',
        readonly luggageType: 'basic' | 'medium' | 'premium',
        readonly departureFlightUuid: string,
        readonly departureSeats: number,
        readonly passagers: Passanger[],
        readonly returnFlightUuid?: string,
        readonly returnSeats?: number
    ) {
    }
}