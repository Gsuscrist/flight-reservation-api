import {Request,Response} from "express";
import {CheckInReservationUseCase} from "../../application/useCase/checkInReservationUseCase";
import {EmailService} from "../services/emailService";


export class CheckInReservationController{
    constructor(readonly useCase:CheckInReservationUseCase, readonly emailService:EmailService) {
    }

    async run(req:Request, res:Response){
        try {
            let {uuid} = req.body
            let checkIn  = await this.useCase.run(uuid);
            if (checkIn){
                const passengers = checkIn.passengers
                console.log(passengers)
                const message= `thanks for check-in your reservation, on this email you will find: \n
                Reservation's code: ${uuid}
                Reservation's resume:\n${JSON.stringify(checkIn, null, 2)}
                                              IMPORTANT:
                THIS EMAIL WAS SENT TO ALL THE PASSENGERS FROM THE RESERVATION;
                DO NOT FORGET TO PRINT THIS EMAIL AND GIVE IT TO THE CASHIER THE FLIGHT DATE`
                const emailsAddress = new Set<string>();
                passengers.forEach((passenger: { email: string; }) =>{
                    emailsAddress.add(passenger.email)
                })
                emailsAddress.forEach(mail=>{
                    this.emailService.sendEmail(mail,"RESERVATION RESUME CHECK-IN", message)
                })

                return res.status(200).send({
                    status:"success",
                    data:[],
                    message:"reservation check-in successfully"
                })
            }
            res.status(400).send({
                status:"error",
                data:[],
                message:"check in failed, please try again later"
            })

        }catch (e) {
            res.status(417).send({
                status:"error",
                error: e
            })
        }
    }


}