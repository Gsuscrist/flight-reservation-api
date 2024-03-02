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
                let flight = yield this.useCase.runByUuid(uuid);
                if (flight) {
                    return res.status(200).send({
                        status: "success",
                        data: {
                            uuid: flight.uuid,
                            aeroline: flight.aeroline,
                            origin: flight.origin,
                            destiny: flight.destiny
                        },
                        message: "flight getting successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "flight getting failed"
                });
            }
            catch (e) {
                console.log(e);
                res.status(417).send({
                    status: "error",
                    error: e
                });
            }
        });
    }
    runByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let type = req.params.type;
                let date = req.params.date;
                let flights = yield this.useCase.runByDate(date, type);
                if (flights) {
                    return res.status(200).send({
                        status: "success",
                        data: flights,
                        message: "flights getting successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "flight getting failed"
                });
            }
            catch (e) {
                console.log(e);
                res.status(417).send({
                    status: "error",
                    error: e
                });
            }
        });
    }
    runByPlace(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let type = req.params.type;
                let place = req.params.place;
                let flights = yield this.useCase.runByPlace(place, type);
                if (flights) {
                    return res.status(200).send({
                        status: "success",
                        data: flights,
                        message: "flight getting successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "flight getting failed"
                });
            }
            catch (e) {
                console.log(e);
                res.status(417).send({
                    status: "error",
                    error: e
                });
            }
        });
    }
}
exports.GetFlightController = GetFlightController;
