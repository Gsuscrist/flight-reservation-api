import {Credentials} from "./credentials";

export class User{
    constructor(
        readonly uuid:string,
        readonly name: string,
        readonly lastname: string,
        readonly credentials: Credentials,
        readonly deletedAt: Date | null
    ) {
    }
}