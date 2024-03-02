import {MysqlFlightRepository} from "./mysqlFlightRepository";
import {CreateFlightUseCase} from "../application/useCases/createFlightUseCase";
import {GenerateUuidFlightUseCase} from "../application/useCases/generateUuidFlightUseCase";
import {CreateFlightController} from "./controllers/createFlightController";
import {DeleteFlightUseCase} from "../application/useCases/deleteFlightUseCase";
import {DeleteFlightController} from "./controllers/deleteFlightController";
import {GetFlightUseCase} from "../application/useCases/getFlightUseCase";
import {GetFlightController} from "./controllers/getFlightController";
import {UpdateFlightUseCase} from "../application/useCases/updateFlightUseCase";
import {UpdateFlightController} from "./controllers/updateFlightController";

export const mysqlFlightRepository = new MysqlFlightRepository()

export const createFlightUseCase = new CreateFlightUseCase(mysqlFlightRepository)
export const generateUuid = new GenerateUuidFlightUseCase(mysqlFlightRepository)
export const createFlightController = new CreateFlightController(createFlightUseCase,generateUuid)


export const deleteFlightUseCase = new DeleteFlightUseCase(mysqlFlightRepository)
export const deleteFlightController = new DeleteFlightController(deleteFlightUseCase)


export const getFlightUseCase = new GetFlightUseCase(mysqlFlightRepository)
export const getFlightController = new GetFlightController(getFlightUseCase)


export const updateFlightUseCase = new UpdateFlightUseCase(mysqlFlightRepository)
export const updateFlightController = new UpdateFlightController(updateFlightUseCase)