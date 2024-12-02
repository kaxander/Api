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
exports.listAllFuncionariosByAdmin = void 0;
const Funcionario_1 = require("../../models/Funcionario");
function listAllFuncionariosByAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "O ID do admin é obrigatório." });
            }
            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({ message: "O ID fornecido não é válido." });
            }
            const funcionarios = yield Funcionario_1.Funcionario.find().where("admin").equals(id);
            if (!funcionarios || funcionarios.length === 0) {
                return res.status(404).json({ message: "Não há funcionários associados a este admin." });
            }
            res.status(200).json(funcionarios);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar os funcionários" });
        }
    });
}
exports.listAllFuncionariosByAdmin = listAllFuncionariosByAdmin;
