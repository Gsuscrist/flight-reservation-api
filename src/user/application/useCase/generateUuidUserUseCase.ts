import {UserRepository} from "../../domain/userRepository";

export class GenerateUuidUserUseCase{

    constructor(readonly repository:UserRepository) {
    }

    async run(name:string){
        try {
            return await this.repository.generateUuid(name)
        }catch (e){
            console.log(e)
            return null
        }
    }
}