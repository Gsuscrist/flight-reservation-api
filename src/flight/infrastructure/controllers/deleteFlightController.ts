import {Request,Response} from "express";
import {DeleteFlightUseCase} from "../../application/useCases/deleteFlightUseCase";

export class DeleteFlightController {
    constructor(readonly useCase:DeleteFlightUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            await this.useCase.run(uuid)
            res.status(200).send(
                {
                    status: "success",
                    data: [],
                    message:"flight deletion successfully"
                }
            )
        }catch (e) {
            console.log(e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }
}