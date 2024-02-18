"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const credentials_1 = require("../../domain/entity/credentials");
class CreateUserController {
    constructor(useCase, encryptService, uuid) {
        this.useCase = useCase;
        this.encryptService = encryptService;
        this.uuid = uuid;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, lastname, email, password } = req.body;
                password = yield this.encryptService.execute(password);
                let credentials = new credentials_1.Credentials(email, password);
                let uuid = yield this.uuid.run(name);
                const createdUser = yield this.useCase.run(uuid, name, lastname, credentials);
                if (createdUser) {
                    return res.status(201).send({
                        status: "success",
                        data: {
                            uuid: createdUser.uuid,
                            name: createdUser.name,
                            lastname: createdUser.lastname,
                            email: createdUser.credentials.email
                        },
                        message: "user creation successfully",
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "user creation failed"
                });
            }
            catch (e) {
                console.log(e);
                res.status(417).send({
                    message: "error",
                    error: e
                });
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
