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
exports.GetReservationController = void 0;
class GetReservationController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let uuid = req.params.uuid;
                let reservation = yield this.useCase.run(uuid);
                if (reservation) {
                    return res.status(200).send({
                        status: "success",
                        data: reservation,
                        message: "Reservation getting successfully"
                    });
                }
                res.status(400).send({
                    status: "error",
                    data: [],
                    message: "Reservation getting failed"
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
exports.GetReservationController = GetReservationController;
