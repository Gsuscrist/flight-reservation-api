import {Request,Response} from "express";
import {CreateReservationUseCase} from "../../application/useCase/createReservationUseCase";
import {GenerateUuidReservationUseCase} from "../../application/useCase/generateUuidReservationUseCase";

export class CreateReservationController{
    constructor(readonly useCase:CreateReservationUseCase, readonly uuid:GenerateUuidReservationUseCase) {
    }


    async run(req:Request,res:Response){
        try {
            let {flightType,luggageType,departureFlightUuid,departureSeats,passengers,returnFlightUuid,
                returnSeats} = req.body
            let uuid = await this.uuid.run(flightType)
            let createdReservation = await this.useCase.run(uuid,flightType,luggageType,departureFlightUuid,
                departureSeats,passengers,returnFlightUuid,returnSeats)
            if (createdReservation){
                //TODO: VERIFY DATA RESPONSE
                return res.status(201).send({
                    status:"success",
                    data:createdReservation,
                    message:"Reservation creation successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"Reservation creation failed"
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