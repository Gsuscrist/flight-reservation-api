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
                return res.status(200).send({
                    status:"success",
                    data:{
                        uuid:flight.uuid,
                        aeroline:flight.aeroline,
                        origin:flight.origin,
                        destiny:flight.destiny
                    },
                    message:"flight getting successfully"
                });
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"flight getting failed"
            });
        }catch (e) {
            console.log(e)
            res.status(417).send({
                status:"error",
                error:e
            });
        }
    }

    async runByDate(req:Request, res:Response){
        try {
            let type = req.params.type;
            let date = req.params.date;
            let flights = await this.useCase.runByDate(date,type)
            if(flights){
                return res.status(200).send({
                    status:"success",
                    data: flights,
                    message:"flights getting successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"flight getting failed"
            })
        }catch (e) {
            console.log(e)
            res.status(417).send({
                status:"error",
                error:e
            })
        }
    }


    async runByPlace(req:Request, res:Response){
        try {
            let type = req.params.type;
            let place = req.params.place;
            let flights = await this.useCase.runByPlace(place,type)
            if(flights){
                return res.status(200).send({
                    status:"success",
                    data:flights,
                    message:"flight getting successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"flight getting failed"
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