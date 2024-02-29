import {Request,Response} from "express";
import {CreateReservationUseCase} from "../../application/useCase/createReservationUseCase";
import {GenerateUuidReservationUseCase} from "../../application/useCase/generateUuidReservationUseCase";
import {EmailService} from "../services/emailService";


export class CreateReservationController{
    constructor(readonly useCase:CreateReservationUseCase, readonly uuid:GenerateUuidReservationUseCase, readonly emailService : EmailService) {
    }


    async run(req:Request,res:Response){
        // TODO: SEND A PRICE REFERENCE
        try {
            let {flightType,luggageType,departureFlightUuid,departureSeats,passengers,returnFlightUuid,
                returnSeats} = req.body
            let uuid = await this.uuid.run(flightType)
            let createdReservation = await this.useCase.run(uuid,flightType,luggageType,departureFlightUuid,
                departureSeats,passengers,returnFlightUuid,returnSeats)
            if (createdReservation){

                const verificationURL =`http://localhost:8080/reservation/check-in/flights`
                const message= `thanks for your reservation, on this email you will find: \n
                Check-in link: ${verificationURL}
                Reservation's code: ${uuid}
    
                HOW TO CHECK-IN: 
                access the link and send your reservation code 
                
                IMPORTANT:
                THIS EMAIL WAS SENT TO ALL THE PASSENGERS FROM THE RESERVATION, AT LEAST ONE PASSENGER MUST DO THE CHECK-IN.
                YOU HAVE TO CHECK-IN TO GUARANTEE YOUR SPACE(S) IN THE FLIGHT `
                const emailsAddress = new Set<string>();

                passengers.forEach((passenger: { email: string; }) =>{
                    emailsAddress.add(passenger.email)
                })
                emailsAddress.forEach(mail=>{
                    this.emailService.sendEmail(mail,"RESERVATION IMPORTANT RESUME", message)
                })

                return res.status(201).send({
                    status:"success",
                    data:createdReservation,
                    message:"Reservation creation successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"Reservation creation failed"
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