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
exports.UpdateUserController = void 0;
const credentials_1 = require("../../domain/entity/credentials");
const user_1 = require("../../domain/entity/user");
class UpdateUserController {
    constructor(useCase, encrypt) {
        this.useCase = useCase;
        this.encrypt = encrypt;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let uuid = req.params.uuid;
                let { name, lastname, email, password } = req.body;
                password = yield this.encrypt.execute(password);
                let credentials = new credentials_1.Credentials(email, password);
                let user = new user_1.User(uuid, name, lastname, credentials, null);
                const updatedUser = yield this.useCase.run(uuid, user);
                if (updatedUser) {
                    res.status(200).send({
                        status: "success",
                        data: {
                            uuid: updatedUser.uuid,
                            name: updatedUser.name,
                            lastname: updatedUser.lastname,
                            email: updatedUser.credentials.email
                        },
                        message: "user updating successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "user update fail"
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
exports.UpdateUserController = UpdateUserController;
