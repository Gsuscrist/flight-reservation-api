import {MysqlFlightRepository} from "./mysqlFlightRepository";
import {CreateFlightUseCase} from "../application/useCases/createFlightUseCase";
import {GenerateUuidFlightUseCase} from "../application/useCases/generateUuidFlightUseCase";
import {CreateFlightController} from "./controllers/createFlightController";

export const mysqlFlightRepository = new MysqlFlightRepository()

export const createFlightUseCase = new CreateFlightUseCase(mysqlFlightRepository)
export const generateUuid = new GenerateUuidFlightUseCase(mysqlFlightRepository)
export const createFlightController = new CreateFlightController(createFlightUseCase,generateUuid)