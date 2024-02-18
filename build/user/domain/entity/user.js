"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(uuid, name, lastname, credentials, deletedAt) {
        this.uuid = uuid;
        this.name = name;
        this.lastname = lastname;
        this.credentials = credentials;
        this.deletedAt = deletedAt;
    }
}
exports.User = User;
