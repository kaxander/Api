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
exports.deleteAdmin = void 0;
const Admin_1 = require("../../models/Admin");
const Produto_1 = require("../../models/Produto");
const Funcionario_1 = require("../../models/Funcionario");
const Pedido_1 = require("../../models/Pedido");
const Categoria_1 = require("../../models/Categoria");
function deleteAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield Produto_1.Produto.deleteMany({ adminId: id });
            yield Funcionario_1.Funcionario.deleteMany({ adminId: id });
            yield Pedido_1.Pedido.deleteMany({ adminId: id });
            yield Categoria_1.Categoria.deleteMany({ adminId: id });
            const admin = yield Admin_1.Admin.findByIdAndDelete(id);
            if (!admin) {
                return res.status(404).json({ message: "Admin não encontrado!" });
            }
            res.status(200).json({ message: "Admin e dados relacionados excluídos com sucesso!" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao deletar admin e dados relacionados." });
        }
    });
}
exports.deleteAdmin = deleteAdmin;
