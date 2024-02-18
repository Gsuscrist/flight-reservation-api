import {User} from "./entity/user";
import {Credentials} from "./entity/credentials";
import {EncryptService} from "./services/encryptService";

export interface UserRepository{
    getById(uuid:string):Promise<User | any>
    update(uuid:string, user:User):Promise<User|any>
    delete(uuid:string):Promise<void>
    create(
        uuid:string,
        name:string,
        lastname:string,
        credentials:Credentials
    ):Promise<User|any>
    login(credentials:Credentials,encryptService:EncryptService):Promise<User|any>
    generateUuid(name:string):Promise<string|any>
}