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
exports.CreateFlightController = void 0;
const location_1 = require("../../domain/entity/location");
class CreateFlightController {
    constructor(useCase, uuid) {
        this.useCase = useCase;
        this.uuid = uuid;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { aeroline } = req.body;
                let origin = new location_1.Location(req.body.origin.country, req.body.origin.city, req.body.origin.airport, req.body.origin.terminal, req.body.origin.gate, req.body.origin.date);
                let destiny = new location_1.Location(req.body.destiny.country, req.body.destiny.city, req.body.destiny.airport, req.body.destiny.terminal, req.body.destiny.gate, req.body.destiny.date);
                let uuid = yield this.uuid.run(aeroline);
                console.log("o:", origin);
                console.log("d:", destiny);
                const createdFlight = yield this.useCase.run(uuid, aeroline, origin, destiny);
                if (createdFlight) {
                    return res.status(201).send({
                        status: "Success",
                        data: {
                            uuid: createdFlight.uuid,
                            aeroline: createdFlight.aeroline,
                            origin: createdFlight.origin,
                            destiny: createdFlight.destiny
                        },
                        message: "Flight creation successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "flight creation failed"
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
exports.CreateFlightController = CreateFlightController;
