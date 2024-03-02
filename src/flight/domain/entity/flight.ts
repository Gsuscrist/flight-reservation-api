import {Location} from "./location";

export class Flight{

    constructor(
        readonly uuid:string,
        readonly aeroline:string,
        readonly origin:Location,
        readonly destiny:Location,
        // TODO: ADD CAPACITY, SEATS OR SOMETHING LIKE THAT TO THE SEATS LOGIC
        // MAYBE A MATRIX OR SOMETHING
        //!how do i do this
        readonly deletedAt:Date|null,
    ) {
    }

}