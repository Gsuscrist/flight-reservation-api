import {Request,Response} from "express";
import {CreateFlightUseCase} from "../../application/useCases/createFlightUseCase";
import {Location} from "../../domain/entity/location";
import {GenerateUuidUserUseCase} from "../../../user/application/useCase/generateUuidUserUseCase";
import {GenerateUuidFlightUseCase} from "../../application/useCases/generateUuidFlightUseCase";


export class CreateFlightController{
    constructor(readonly useCase:CreateFlightUseCase, readonly uuid:GenerateUuidFlightUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let {aeroline} = req.body
            let origin  = new Location(req.body.origin.country, req.body.origin.city, req.body.origin.airport,
                req.body.origin.terminal, req.body.origin.gate, req.body.origin.date)
            let destiny  = new Location(req.body.destiny.country, req.body.destiny.city, req.body.destiny.airport,
                req.body.destiny.terminal, req.body.destiny.gate, req.body.destiny.date)
            let uuid= await this.uuid.run(aeroline);
            console.log("o:", origin)
            console.log("d:", destiny)
            const createdFlight = await this.useCase.run(uuid,aeroline,origin,destiny)
            if (createdFlight){
                return res.status(201).send({
                    status:"Success",
                    data:{
                        uuid:createdFlight.uuid,
                        aeroline:createdFlight.aeroline,
                        origin:createdFlight.origin,
                        destiny:createdFlight.destiny
                    },
                    message:"Flight creation successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"flight creation failed"
            })
        } catch (e) {
            console.log(e)
            res.status(417).send({
                message:"error",
                error:e
            })
        }
    }

}