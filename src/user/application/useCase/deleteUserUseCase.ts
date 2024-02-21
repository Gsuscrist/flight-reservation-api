import {UserRepository} from "../../domain/userRepository";

export class DeleteUserUseCase{
    constructor(readonly repository:UserRepository) {
    }

    async run(
        uuid:string
    ){
        try {
            return await this.repository.delete(uuid)
        }catch (e) {
            console.log(e)
            return null
        }
    }
}