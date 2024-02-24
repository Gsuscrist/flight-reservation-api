import {MysqlReservationRepository} from "./mysqlReservationRepository";
import {CreateReservationUseCase} from "../application/useCase/createReservationUseCase";
import {GenerateUuidReservationUseCase} from "../application/useCase/generateUuidReservationUseCase";
import {CreateReservationController} from "./controllers/createReservationController";
import {DeleteReservationUseCase} from "../application/useCase/deleteReservationUseCase";
import {DeleteReservationController} from "./controllers/deleteReservationController";
import {GetReservationUseCase} from "../application/useCase/getReservationUseCase";
import {GetReservationController} from "./controllers/getReservationController";
import {UpdateReservationUseCase} from "../application/useCase/updateReservationUseCase";
import {UpdateReservationController} from "./controllers/updateReservationController";

export const mysqlReservationRepository = new MysqlReservationRepository()


export const createReservationUseCase = new CreateReservationUseCase(mysqlReservationRepository)
export const generateUuid = new GenerateUuidReservationUseCase(mysqlReservationRepository)
export const createReservationController = new CreateReservationController(createReservationUseCase,generateUuid)


export const deleteReservationUseCase = new DeleteReservationUseCase(mysqlReservationRepository)
export const deleteReservationController = new DeleteReservationController(deleteReservationUseCase)


export const getReservationUseCase = new GetReservationUseCase(mysqlReservationRepository)
export const getReservationController = new GetReservationController(getReservationUseCase)


export const updateReservationUseCase = new UpdateReservationUseCase(mysqlReservationRepository)
export const updateReservationController = new UpdateReservationController(updateReservationUseCase)