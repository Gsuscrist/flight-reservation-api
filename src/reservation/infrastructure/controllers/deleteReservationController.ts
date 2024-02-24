import {Request,Response} from "express";
import {DeleteReservationUseCase} from "../../application/useCase/deleteReservationUseCase";

export class DeleteReservationController{
    constructor(readonly useCase:DeleteReservationUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            await this.useCase.run(uuid)
            res.status(200).send({
                status:"success",
                data:[],
                message:"reservation deletion successfully"
            })
        }catch (e) {
            console.log(e)
            res.status(417).send({
                status:"error",
                error: e
            })
        }
    }
}