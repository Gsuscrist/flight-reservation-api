import {Request,Response} from "express";
import {GetFlightUseCase} from "../../application/useCases/getFlightUseCase";

export class GetFlightController{
    constructor(readonly useCase:GetFlightUseCase) {
    }

    async runByUuid(req:Request,res:Response){
        try{
            let uuid = req.params.uuid;
            let flight = await this.useCase.runByUuid(uuid)
            if(flight){
                res.status(200).send({
                    message:"success",
                    data:{
                        uuid:flight.uuid,
                        aeroline:flight.aeroline,
                        origin:flight.origin,
                        destiny:flight.destiny
                    }
                })
            res.status(400).send({
                status:"error",
                data:[],
                message:"flight getting successfully"
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

    async runByOriginDate(req:Request, res:Response){
        try {
            let date = new Date(req.params.date);
            let flight = await this.useCase.runByOriginDate(date)
            if(flight){
                res.status(200).send({
                    message:"success",
                    data:{
                        uuid:flight.uuid,
                        aeroline:flight.aeroline,
                        origin:flight.origin,
                        destiny:flight.destiny
                    }
                })
                res.status(400).send({
                    status:"error",
                    data:[],
                    message:"flight getting successfully"
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


    async runByDestinyDate(req:Request, res:Response){
        try {
            let date = new Date(req.params.date);
            let flight = await this.useCase.runByOriginDate(date)
            if(flight){
                res.status(200).send({
                    message:"success",
                    data:{
                        uuid:flight.uuid,
                        aeroline:flight.aeroline,
                        origin:flight.origin,
                        destiny:flight.destiny
                    }
                })
                res.status(400).send({
                    status:"error",
                    data:[],
                    message:"flight getting successfully"
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