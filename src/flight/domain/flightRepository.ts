import {Location} from "./entity/location";
import {Flight} from "./entity/flight";

export interface FlightRepository{
    generateUuid(aeroline:string):Promise<string|any>
    createFlight(uuid:string,aeroline:string,origin:Location,destiny:Location):Promise<Flight|any>
    updateFlight(uuid:string,flight:Flight):Promise<Flight|any>
    getByUuid(uuid:string):Promise<Flight|any>
    getByDate(date:string, type:string):Promise<Flight[]|any>
    getByPlace(place:string, type:string):Promise<Flight[]|any>
    deleteByUuid(uuid:string):Promise<void>


}