"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
class Flight {
    constructor(uuid, aeroline, origin, destiny, 
    // TODO: ADD CAPACITY, SEATS OR SOMETHING LIKE THAT TO THE SEATS LOGIC
    // MAYBE A MATRIX OR SOMETHING
    //!how do i do this
    deletedAt) {
        this.uuid = uuid;
        this.aeroline = aeroline;
        this.origin = origin;
        this.destiny = destiny;
        this.deletedAt = deletedAt;
    }
}
exports.Flight = Flight;
