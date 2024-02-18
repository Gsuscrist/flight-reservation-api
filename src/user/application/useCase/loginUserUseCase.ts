import {UserRepository} from "../../domain/userRepository";
import {Credentials} from "../../domain/entity/credentials";
import {EncryptService} from "../../domain/services/encryptService";
import {User} from "../../domain/entity/user";

export class LoginUserUseCase{
    constructor(readonly repository:UserRepository) {
    }

    async run(
        credentials:Credentials,
        encryptService:EncryptService
    ):Promise<User|any>{
        try {
            return await this.repository.login(credentials,encryptService)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}