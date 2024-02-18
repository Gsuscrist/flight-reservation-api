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
exports.MysqlUserRepository = void 0;
const credentials_1 = require("../domain/entity/credentials");
const user_1 = require("../domain/entity/user");
const mysql_1 = require("../../database/mysql");
class MysqlUserRepository {
    generateUuid(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const namePrefix = name.slice(0, 3).toLowerCase();
                const randomNumbers = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10));
                let result = '';
                for (let i = 0; i < 3; i++) {
                    result += namePrefix[i] + randomNumbers[i];
                }
                return result;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    create(uuid, name, lastname, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "INSERT INTO users (uuid, name, lastname, email, password) VALUES (?,?,?,?,?)";
                const params = [uuid, name, lastname, credentials.email, credentials.password];
                const [result] = yield (0, mysql_1.query)(sql, params);
                return new user_1.User(uuid, name, lastname, credentials, null);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    //TODO: CHANGE DELETE TO RETURN BOOL IN ORDER TO SUCCESS
    delete(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                const sql = "UPDATE users SET deleted_at = ? WHERE uuid = ?";
                const params = [date, uuid];
                const [result] = yield (0, mysql_1.query)(sql, params);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getById(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE uuid = ?";
                const params = [uuid];
                const [result] = yield (0, mysql_1.query)(sql, params);
                const user = result[0];
                const credentials = new credentials_1.Credentials(user.email, user.password);
                return new user_1.User(uuid, user.name, user.lastname, credentials, user.deletedAt);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    login(credentials, encryptService) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE email= ? AND deleted_at IS NULL";
                const params = [credentials.email];
                const [result] = yield (0, mysql_1.query)(sql, params);
                console.log(credentials.password);
                if (yield encryptService.compare(credentials.password, result[0].password)) {
                    console.log("match");
                    const user = result[0];
                    const credentials = new credentials_1.Credentials(user.email, user.password);
                    return new user_1.User(user.uuid, user.name, user.lastname, credentials, user.deletedAt);
                }
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    update(uuid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "UPDATE users SET name = ?, lastname = ?, email = ?, password = ? WHERE uuid = ?";
                const params = [user.name, user.lastname, user.credentials.email, user.credentials.password, uuid];
                yield (0, mysql_1.query)(sql, params);
                return user;
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
