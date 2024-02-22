import {Location} from "./entity/location";
import {Flight} from "./entity/flight";

export interface FlightRepository{
    createFlight(uuid:string,aeroline:string,origin:Location,destiny:Location):Promise<Flight|any>
    updateFlight(uuid:string,flight:Flight):Promise<Flight|any>
    getById(uuid:string):Promise<Flight|any>
    getByDate(date:Date):Promise<Flight|any>
    deleteById(uuid:string):Promise<void>


}