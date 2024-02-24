import {query} from "../../database/mysql"
import {ReservationRepository} from "../domain/reservationRepository";
import {Passenger} from "../domain/entity/passenger";
import {Reservation} from "../domain/entity/reservation";


export class MysqlReservationRepository implements ReservationRepository{
    create(uuid: string, flightType: "one-way" | "round-trip", luggageType: "basic" | "medium" | "premium", departureFlightUuid: string, departureSeats: number, passengers: Passenger[], returnFlightUuid?: string, returnSeats?: number): Promise<any> {
        return Promise.resolve(undefined);
    }

    async deleteByUuid(uuid: string): Promise<void> {
        try {
            let sql = "UPDATE reservations SET deleted_at = ? WHERE uuid = ?"
            let date = new Date()
            let params:any[] = [date,uuid]
            const [results]:any = await query(sql,params)
        }catch (e) {
            console.log(e)
        }
    }


    async getByUuid(uuid: string): Promise<any> {
        try {
            let sql = "SELECT * FROM reservations WHERE uuid=?"
            let params:any[]=[uuid]
            const [results]:any = await query(sql,params)
            if (results){
                let result = results[0]
                return new Reservation(result.uuid, result.flight_type, result.luggage_type, result.departure_flight_uuid,
                    result.departure_seats, result.passengers,null,result.return_flight_uuid, result.return_seats)
            }
        }catch (e){
            console.log(e)
            return null;
        }
    }


    async update(uuid: string, reservation: Reservation): Promise<any> {
        try {
            let sql = "UPDATE reservations SET flight_type =?, luggage_type=?, departure_flight_uuid=?, departure_seats =?, passengers=?, return_flight_uuid=?, return_seats=? WHERE uuid=?"
            let params:any[] = [reservation.flightType,reservation.luggageType,reservation.departureFlightUuid,reservation.departureSeats,reservation.passagers,reservation.returnFlightUuid,reservation.returnSeats,uuid]
            const [results] :any = await query(sql,params)
            if (results){
                let result = results[0]
                return new Reservation(result.uuid, result.flight_type, result.luggage_type, result.departure_flight_uuid,
                    result.departure_seats, result.passengers,null,result.return_flight_uuid, result.return_seats)
            }
        }catch (e) {
            console.log(e)
            return null;
        }
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