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


    getByUuid(uuid: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    update(uuid: string, reservation: Reservation): Promise<any> {
        return Promise.resolve(undefined);
    }
    async generateUuid(flightType: string): Promise<any> {
        try {
            const namePrefix = flightType.slice(0, 4).toLowerCase();
            const randomNumbers = Array.from({ length: 8 }, () =>
                Math.floor(Math.random() * 10));
            let result = '';
            for (let i = 0; i < 4; i++) {
                result += randomNumbers[i] + namePrefix[i] + randomNumbers[i+1];
            }

            return result;
        }catch (e){
            console.log(e)
        }
    }


}