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
exports.createFuncionario = void 0;
const Funcionario_1 = require("../../models/Funcionario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
function createFuncionario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome, email, senha, telefone, admin } = req.body;
            if (!nome) {
                return res.status(400).json({ message: "O nome do funcionário é obrigatório." });
            }
            if (nome.trim().length === 0) {
                return res.status(400).json({ message: "O nome do funcionário não pode ser vazio." });
            }
            if (!email) {
                return res.status(400).json({ message: "O e-mail do funcionário é obrigatório." });
            }
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "O e-mail fornecido não é válido." });
            }
            if (!senha) {
                return res.status(400).json({ message: "A senha do funcionário é obrigatória." });
            }
            if (senha.length < 6) {
                return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
            }
            if (!telefone) {
                return res.status(400).json({ message: "O telefone do funcionário é obrigatório." });
            }
            if (telefone.trim().length === 0) {
                return res.status(400).json({ message: "O telefone não pode ser vazio." });
            }
            if (!admin) {
                return res.status(400).json({ message: "O campo 'admin' (ID do administrador) é obrigatório." });
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(admin)) {
                return res.status(400).json({ message: "O ID do administrador fornecido não é válido." });
            }
            const hashedSenha = yield bcrypt_1.default.hash(senha, 10);
            const funcionario = yield Funcionario_1.Funcionario.create({
                nome,
                email,
                senha: hashedSenha,
                telefone,
                admin,
            });
            res.status(201).json(funcionario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao criar o funcionário." });
        }
    });
}
exports.createFuncionario = createFuncionario;
