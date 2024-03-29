import {query} from "../../database/mysql"
import {ReservationRepository} from "../domain/reservationRepository";
import {Passenger} from "../domain/entity/passenger";
import {Reservation} from "../domain/entity/reservation";
import {isEmpty} from "class-validator";


export class MysqlReservationRepository implements ReservationRepository{


    async create(uuid: string, flightType: "one-way" | "round-trip", luggageType: "basic" | "medium" | "premium", departureFlightUuid: string, departureSeats: number, passengers: Passenger[], returnFlightUuid?: string, returnSeats?: number): Promise<any> {
        try {
          let isValid=false;
          if (departureFlightUuid !== null ){
              let verificationSql  ="SELECT * FROM flights WHERE uuid = ? AND deleted_at IS NULL";
              let verificationParams:any[]=[departureFlightUuid];
              let [verificationResults]:any= await query(verificationSql,verificationParams)

              if (verificationResults.length > 0){isValid=true}else{throw new Error("flight uuid invalid")}
          }else
          if(returnFlightUuid!== null){
              isValid=false;
              let verification2Sql  ="SELECT * FROM flights WHERE uuid = ? AND deleted_at IS NULL";
              let verification2Params:any[]=[departureFlightUuid];
              let [verification2Results]:any= await query(verification2Sql,verification2Params);
              if (verification2Results.length > 0){isValid=true}else{throw new Error("flight uuid invalid")}
          }
          if (returnSeats !== passengers.length || departureSeats !== passengers.length && departureSeats !== null){
              throw new Error("Please include all passangers information")
              isValid=false
          }else {isValid=true}
          if (isValid){
          let sql = "INSERT INTO reservations (uuid,flight_type, luggage_type, departure_flight_uuid,departure_seats, passengers, return_flight_uuid, return_seats) values(?,?,?,?,?,?,?,?)";
          let params:any[]=[uuid,flightType,luggageType,departureFlightUuid,departureSeats,passengers,returnFlightUuid,returnSeats];
          const [results]:any = await query(sql,params);
              if (results){
                  return new Reservation(uuid,flightType,luggageType,departureFlightUuid,departureSeats,passengers,null,null,returnFlightUuid,returnSeats)
              }
          }
        }catch (e) {
            console.log(e)
            return null;
        }
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
                    result.departure_seats,JSON.parse(result.passengers) ,null,result.checkin_at,result.return_flight_uuid, result.return_seats)
            }
        }catch (e){
            console.log(e)
            return null;
        }
    }


    async update(uuid: string, reservation: Reservation): Promise<any> {
        try {
            let sql = "UPDATE reservations SET flight_type =?, luggage_type=?, departure_flight_uuid=?, departure_seats =?, passengers=?, return_flight_uuid=?, return_seats=? WHERE uuid=?"
            let params:any[] = [reservation.flightType,reservation.luggageType,reservation.departureFlightUuid,reservation.departureSeats,reservation.passengers,reservation.returnFlightUuid,reservation.returnSeats,uuid]
            const [results] :any = await query(sql,params)
            if (results){
                return reservation
            }
        }catch (e) {
            console.log(e)
            return null;
        }
    }


    async generateUuid(flightType: string): Promise<any> {
        try {
            let result
            do{
            const namePrefix = flightType.slice(0, 4).toLowerCase();
            const randomNumbers = Array.from({ length: 8 }, () =>
                Math.floor(Math.random() * 10));
            result = '';
            for (let i = 0; i < 4; i++) {
                result += randomNumbers[i] + namePrefix[i] + randomNumbers[i+1];
            }}while ( await this.getByUuid(result))

            return result;
        }catch (e){
            console.log(e)
        }
    }

    async checkIn(uuid: string): Promise<any> {
        try {
            let sql = "UPDATE reservations SET checkin_at = ? WHERE uuid = ?"
            let date = new Date()
            let params:any[] = [date,uuid]
            const [results]:any = await query(sql,params)
            if (results){
                return await this.getByUuid(uuid)
            }
        }catch (e) {
            console.log(e)
            return null
        }
    }


}