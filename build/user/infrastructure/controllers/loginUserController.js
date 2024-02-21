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
exports.LoginUserController = void 0;
const credentials_1 = require("../../domain/entity/credentials");
class LoginUserController {
    constructor(useCase, encrypt, jwtRepository) {
        this.useCase = useCase;
        this.encrypt = encrypt;
        this.jwtRepository = jwtRepository;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, password } = req.body;
                let credentials = new credentials_1.Credentials(email, password);
                const loggedUser = yield this.useCase.run(credentials, this.encrypt);
                if (loggedUser) {
                    let token = yield this.jwtRepository.generateToken(email);
                    return res.status(200).send({
                        status: "success",
                        data: {
                            uuid: loggedUser.uuid,
                            name: loggedUser.name,
                            lastname: loggedUser.lastname,
                            email: loggedUser.credentials.email,
                            token: token
                        },
                        message: "user login successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "user login fail"
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
exports.LoginUserController = LoginUserController;
