import {ReservationRepository} from "../domain/reservationRepository";
import {Passenger} from "../domain/entity/passenger";
import {Reservation} from "../domain/entity/reservation";


export class MysqlReservationRepository implements ReservationRepository{
    create(uuid: string, flightType: "one-way" | "round-trip", luggageType: "basic" | "medium" | "premium", departureFlightUuid: string, departureSeats: number, passengers: Passenger[], returnFlightUuid?: string, returnSeats?: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    deleteByUuid(uuid: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    generateUuid(flightType: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    getByUuid(uuid: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(uuid: string, reservation: Reservation): Promise<any> {
        return Promise.resolve(undefined);
    }


}