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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePedido = void 0;
const Pedido_1 = require("../../models/Pedido");
const mongoose_1 = __importDefault(require("mongoose"));
function deletePedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido." });
            }
            const pedido = yield Pedido_1.Pedido.findByIdAndDelete(id);
            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado." });
            }
            res.status(200).json({ message: "Pedido deletado com sucesso.", pedido });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao deletar o pedido" });
        }
    });
}
exports.deletePedido = deletePedido;
