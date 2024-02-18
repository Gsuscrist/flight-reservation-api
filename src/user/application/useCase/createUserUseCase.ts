import {UserRepository} from "../../domain/userRepository";
import {Credentials} from "../../domain/entity/credentials";
import {User} from "../../domain/entity/user";

export class CreateUserUseCase{
    constructor(readonly repository:UserRepository) {
    }

    async run(
        uuid: string,
        name: string,
        lastname: string,
        credentials: Credentials,
    ):Promise<any>{
        try {
            return await this.repository.create(uuid,name,lastname,credentials)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}