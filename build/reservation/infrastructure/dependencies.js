"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReservationController = exports.updateReservationUseCase = exports.getReservationController = exports.getReservationUseCase = exports.deleteReservationController = exports.deleteReservationUseCase = exports.createReservationController = exports.emailService = exports.generateUuid = exports.createReservationUseCase = exports.mysqlReservationRepository = void 0;
const mysqlReservationRepository_1 = require("./mysqlReservationRepository");
const createReservationUseCase_1 = require("../application/useCase/createReservationUseCase");
const generateUuidReservationUseCase_1 = require("../application/useCase/generateUuidReservationUseCase");
const createReservationController_1 = require("./controllers/createReservationController");
const deleteReservationUseCase_1 = require("../application/useCase/deleteReservationUseCase");
const deleteReservationController_1 = require("./controllers/deleteReservationController");
const getReservationUseCase_1 = require("../application/useCase/getReservationUseCase");
const getReservationController_1 = require("./controllers/getReservationController");
const updateReservationUseCase_1 = require("../application/useCase/updateReservationUseCase");
const updateReservationController_1 = require("./controllers/updateReservationController");
const emailService_1 = require("./services/emailService");
exports.mysqlReservationRepository = new mysqlReservationRepository_1.MysqlReservationRepository();
exports.createReservationUseCase = new createReservationUseCase_1.CreateReservationUseCase(exports.mysqlReservationRepository);
exports.generateUuid = new generateUuidReservationUseCase_1.GenerateUuidReservationUseCase(exports.mysqlReservationRepository);
exports.emailService = new emailService_1.EmailService();
exports.createReservationController = new createReservationController_1.CreateReservationController(exports.createReservationUseCase, exports.generateUuid, exports.emailService);
exports.deleteReservationUseCase = new deleteReservationUseCase_1.DeleteReservationUseCase(exports.mysqlReservationRepository);
exports.deleteReservationController = new deleteReservationController_1.DeleteReservationController(exports.deleteReservationUseCase);
exports.getReservationUseCase = new getReservationUseCase_1.GetReservationUseCase(exports.mysqlReservationRepository);
exports.getReservationController = new getReservationController_1.GetReservationController(exports.getReservationUseCase);
exports.updateReservationUseCase = new updateReservationUseCase_1.UpdateReservationUseCase(exports.mysqlReservationRepository);
exports.updateReservationController = new updateReservationController_1.UpdateReservationController(exports.updateReservationUseCase);
