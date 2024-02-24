import {Request,Response} from "express";
import {UpdateReservationUseCase} from "../../application/useCase/updateReservationUseCase";
import {Reservation} from "../../domain/entity/reservation";

export class UpdateReservationController{
    constructor(readonly useCase:UpdateReservationUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            let {flightType,luggageType,departureFlightUuid,departureSeats,passengers,returnFlightUuid,
                returnSeats} = req.body
            const reservation = new Reservation(uuid,flightType,luggageType,departureFlightUuid,
                departureSeats,passengers,null,returnFlightUuid,returnSeats)

            let updatedReservation = await this.useCase.run(uuid,reservation)

            if (updatedReservation){
                return res.status(200).send({
                    status:"success",
                    data:updatedReservation,
                    message:"Reservation updating successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"Reservation updating failed"
            })

        }catch (e) {
            console.log(e)
            res.status(417).send({
                status:"error",
                error:e
            })
        }
    }
}