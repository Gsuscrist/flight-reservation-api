import {Request,Response} from "express";
import {UpdateUserUseCase} from "../../application/useCase/updateUserUseCase";
import {EncryptService} from "../../domain/services/encryptService";
import {Credentials} from "../../domain/entity/credentials";
import {User} from "../../domain/entity/user";

export class UpdateUserController{
    constructor(readonly useCase:UpdateUserUseCase, readonly encrypt:EncryptService) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid = req.params.uuid
            let{name,lastname,email,password}= req.body
            password = await this.encrypt.execute(password)
            let credentials = new Credentials(email, password)
            let user = new User(uuid,name,lastname,credentials,null)
            const updatedUser = await this.useCase.run(uuid,user)
            if (updatedUser){
                res.status(200).send({
                    status:"success",
                    data:{
                        uuid:updatedUser.uuid,
                        name:updatedUser.name,
                        lastname:updatedUser.lastname,
                        email:updatedUser.credentials.email
                    },
                    message:"user updating successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"user update fail"
            })

        }catch (e) {
            console.log(e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }

}