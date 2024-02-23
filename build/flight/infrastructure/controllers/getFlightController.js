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
exports.GetFlightController = void 0;
class GetFlightController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    runByUuid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let uuid = req.params.uuid;
                let flight = this.useCase.runByUuid(uuid);
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
    runByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let date = new Date(req.params.date);
                let flight = this.useCase.runByDate(date);
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
exports.GetFlightController = GetFlightController;
