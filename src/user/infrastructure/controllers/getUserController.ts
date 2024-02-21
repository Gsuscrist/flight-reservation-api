import {Request,Response} from "express";
import {GetUserUseCase} from "../../application/useCase/getUserUseCase";

export class GetUserController {
    constructor(readonly useCase:GetUserUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            let user = await this.useCase.run(uuid)
            if (user){
                res.status(200).send({
                    status:"success",
                    data:{
                        uuid:user.uuid,
                        name:user.name,
                        lastname:user.lastname,
                        email:user.credentials.email
                    },
                    message:"user getting successfully"
                })
            }

        }catch (e) {
            console.log(e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }

}