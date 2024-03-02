import {Request,Response} from "express";
import {GetReservationUseCase} from "../../application/useCase/getReservationUseCase";


export class GetReservationController{

    constructor(readonly useCase:GetReservationUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            let reservation = await this.useCase.run(uuid)
            if (reservation){
                return res.status(200).send({
                    status:"success",
                    data:reservation,
                    message:"Reservation getting successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"Reservation getting failed"
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