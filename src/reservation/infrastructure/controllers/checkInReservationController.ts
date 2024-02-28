import {Request,Response} from "express";
import {CheckInReservationUseCase} from "../../application/useCase/checkInReservationUseCase";


export class CheckInReservationController{
    constructor(readonly useCase:CheckInReservationUseCase) {
    }

    async run(req:Request, res:Response){
        try {
            let uuid = req.body
            let checkIn  = await this.useCase.run(uuid);
            if (checkIn){
                return res.status(200).send({
                    status:"success",
                    data:[],
                    message:"reservation deletion successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"check in failed, please try again later"
            })

        }catch (e) {
            res.status(417).send({
                status:"error",
                error: e
            })
        }
    }


}