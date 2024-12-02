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
exports.listAllPedidosByAdmin = void 0;
const Pedido_1 = require("../../models/Pedido");
function listAllPedidosByAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "O ID do admin é obrigatório." });
            }
            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({ message: "O ID fornecido não é válido." });
            }
            const pedidos = yield Pedido_1.Pedido.find().where("admin").equals(id);
            if (!pedidos || pedidos.length === 0) {
                return res.status(404).json({ message: "Não há pedidos associados a este admin." });
            }
            res.status(200).json(pedidos);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar os pedidos" });
        }
    });
}
exports.listAllPedidosByAdmin = listAllPedidosByAdmin;
