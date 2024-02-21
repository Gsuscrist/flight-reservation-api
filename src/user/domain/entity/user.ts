import {Credentials} from "./credentials";
import {ValidatableEntity} from "../validators/validatableEntity";

export class User implements ValidatableEntity{
    constructor(
        readonly uuid:string,
        readonly name: string,
        readonly lastname: string,
        readonly credentials: Credentials,
        readonly deletedAt: Date | null
    ) {
    }

    async validate() {
        return Promise.resolve();
    }
}