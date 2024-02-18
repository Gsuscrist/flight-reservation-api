import {Request,Response} from "express";
import {LoginUserUseCase} from "../../application/useCase/loginUserUseCase";
import {EncryptService} from "../../domain/services/encryptService";
import {JwtRepository} from "../../application/jwt/jwtRepository";
import {Credentials} from "../../domain/entity/credentials";

export class LoginUserController{
    constructor(readonly useCase:LoginUserUseCase, readonly encrypt:EncryptService, readonly jwtRepository:JwtRepository) {
    }

    async run(req:Request,res:Response){
        try {
            let{email,password}=req.body
            let credentials = new Credentials(email,password)
            const loggedUser = await this.useCase.run(credentials,this.encrypt)
            if (loggedUser){
                let token = await this.jwtRepository.generateToken(email)
                return res.status(200).send({
                    status:"success",
                    data:{
                        uuid:loggedUser.uuid,
                        name:loggedUser.name,
                        lastname:loggedUser.lastname,
                        email:loggedUser.credentials.email,
                        token:token
                    },
                    message:"user login successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"user login fail"
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