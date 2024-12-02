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
exports.getFuncionario = void 0;
const Funcionario_1 = require("../../models/Funcionario");
const mongoose_1 = __importDefault(require("mongoose"));
function getFuncionario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "ID inválido fornecido." });
            }
            const funcionario = yield Funcionario_1.Funcionario.findById(id);
            if (!funcionario) {
                return res.status(404).json({ message: "Funcionário não encontrado." });
            }
            res.status(200).json(funcionario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao buscar o funcionário." });
        }
    });
}
exports.getFuncionario = getFuncionario;
