import express from 'express';
import {Signale} from 'signale';
import {userRoute} from "./user/infrastructure/routes/userRoute";
import {flightRoute} from "./flight/infrastructure/routes/flightRoute";
import {reservationRoute} from "./reservation/infrastructure/routes/reservationRoute";


const app = express();
const signale = new Signale();

app.use(express.json())

app.use('/user', userRoute);
app.use('/flight', flightRoute);
app.use('/reservation',reservationRoute)

app.listen(8080,()=>{
    signale.success("Server on line in port: 8080")
})