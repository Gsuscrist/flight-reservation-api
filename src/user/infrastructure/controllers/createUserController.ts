import {Request,Response} from "express";
import {CreateUserUseCase} from "../../application/useCase/createUserUseCase";
import {EncryptService} from "../../domain/services/encryptService";
import {Credentials} from "../../domain/entity/credentials";
import {GenerateUuidUserUseCase} from "../../application/useCase/generateUuidUserUseCase";

export class CreateUserController{

    constructor(readonly useCase:CreateUserUseCase, readonly encryptService:EncryptService, readonly uuid:GenerateUuidUserUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let {name,lastname,email,password} = req.body
            password = await this.encryptService.execute(password)
            let credentials = new Credentials(email,password)
            let uuid = await this.uuid.run(name)
            const createdUser = await this.useCase.run(uuid,name,lastname,credentials)

            if (createdUser){
                return res.status(201).send({
                    status:"success",
                    data:{
                        uuid:createdUser.uuid,
                        name:createdUser.name,
                        lastname:createdUser.lastname,
                        email:createdUser.credentials.email
                    },
                    message:"user creation successfully",
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"user creation failed"
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