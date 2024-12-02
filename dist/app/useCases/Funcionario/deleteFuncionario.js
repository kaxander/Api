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
exports.deleteFuncionario = void 0;
const Funcionario_1 = require("../../models/Funcionario");
function deleteFuncionario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({ message: "O ID fornecido não é válido." });
            }
            const funcionario = yield Funcionario_1.Funcionario.findByIdAndDelete(id);
            if (!funcionario) {
                return res.status(404).json({ message: "Funcionário não encontrado." });
            }
            res.status(200).json({ message: "Funcionário deletado com sucesso.", funcionario });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao deletar o funcionário" });
        }
    });
}
exports.deleteFuncionario = deleteFuncionario;
