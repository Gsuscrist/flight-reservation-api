import {Request,Response} from "express";
import {UpdateFlightUseCase} from "../../application/useCases/updateFlightUseCase";
import {Location} from "../../domain/entity/location";
import {Flight} from "../../domain/entity/flight";


export class UpdateFlightController{
    constructor(readonly useCase:UpdateFlightUseCase) {
    }

    async run(req:Request,res:Response){
        try {
            let uuid= req.params.uuid
            let {aeroline} = req.body
            let origin  = new Location(req.body.origin.country, req.body.origin.city, req.body.origin.airport,
                req.body.origin.terminal, req.body.origin.gate, req.body.origin.date)
            let destiny  = new Location(req.body.destiny.country, req.body.destiny.city, req.body.destiny.airport,
                req.body.destiny.terminal, req.body.destiny.gate, req.body.destiny.date)
            const flight = new Flight(uuid,aeroline,origin,destiny,null)
            let updatedFlight = await this.useCase.run(uuid,flight)
            if (updatedFlight){
                res.status(200).send({
                    status:"success",
                    data:{
                        uuid:updatedFlight.uuid,
                        aeroline:updatedFlight.aeroline,
                        origin:updatedFlight.origin,
                        destiny:updatedFlight.destiny
                    }
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