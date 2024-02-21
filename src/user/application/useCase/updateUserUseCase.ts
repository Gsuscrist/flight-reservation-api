import {UserRepository} from "../../domain/userRepository";
import {User} from "../../domain/entity/user";

export class UpdateUserUseCase{
    constructor(readonly repository:UserRepository) {
    }

    async run(
        uuid:string,
        user:User
    ):Promise<User|any>{
        try {
            return await this.repository.update(uuid,user)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}