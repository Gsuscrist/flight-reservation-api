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
exports.Validator = void 0;
const class_validator_1 = require("class-validator");
class Validator {
    constructor(entity) {
        this.entity = entity;
        this.listErrors = [];
    }
    invalidIfHasErrors() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.validate();
            if (!this.foundedErrors()) {
                return;
            }
            throw ({
                http_status: 422,
                validations: this.errors()
            });
        });
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.listErrors = yield (0, class_validator_1.validate)(this.entity);
        });
    }
    errors() {
        return this.listErrors.map((error) => {
            let property = error.property;
            let errorMessages = Object.values(error.constraints);
            return {
                property,
                errorMessages
            };
        });
    }
    foundedErrors() {
        return this.listErrors.length > 0;
    }
}
exports.Validator = Validator;
