import {MysqlUserRepository} from "./mysqlUserRepository";
import {CreateUserUseCase} from "../application/useCase/createUserUseCase";
import {BCryptService} from "../domain/services/bCryptService";
import {CreateUserController} from "./controllers/createUserController";
import {GenerateUuidUserUseCase} from "../application/useCase/generateUuidUserUseCase";
import {DeleteUserUseCase} from "../application/useCase/deleteUserUseCase";
import {DeleteUserController} from "./controllers/deleteUserController";
import {GetUserUseCase} from "../application/useCase/getUserUseCase";
import {GetUserController} from "./controllers/getUserController";
import {LoginUserUseCase} from "../application/useCase/loginUserUseCase";
import {LoginUserController} from "./controllers/loginUserController";
import {Jwt} from "../application/jwt/jwt";
import {UpdateUserUseCase} from "../application/useCase/updateUserUseCase";
import {UpdateUserController} from "./controllers/updateUserController";

export const mysqlUserRepository = new MysqlUserRepository();
export const encryptService = new BCryptService()
export const jwt = new Jwt()



export const createUserUseCase = new CreateUserUseCase(mysqlUserRepository);
export const generateUuid = new GenerateUuidUserUseCase(mysqlUserRepository)
export const createUserController = new CreateUserController(createUserUseCase,encryptService,generateUuid)




export const deleteUserUseCase = new DeleteUserUseCase(mysqlUserRepository)
export const deleteUserController =  new DeleteUserController(deleteUserUseCase)



export const getUserUseCase = new GetUserUseCase(mysqlUserRepository)
export const getUserController = new GetUserController(getUserUseCase)



export const loginUserUseCase = new LoginUserUseCase(mysqlUserRepository)
export const loginUserController = new LoginUserController(loginUserUseCase,encryptService,jwt)



export const updateUserUseCase = new UpdateUserUseCase(mysqlUserRepository)
export const updateUserController = new UpdateUserController(updateUserUseCase,encryptService)
