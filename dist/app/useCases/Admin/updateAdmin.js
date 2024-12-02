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
exports.updateAdmin = void 0;
const Admin_1 = require("../../models/Admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
function updateAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            let { nome, email, senha, telefone } = req.body;
            if (!id) {
                return res.status(400).json({ message: "O ID do administrador é obrigatório." });
            }
            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({ message: "O ID fornecido não é válido." });
            }
            if (!nome && !email && !senha && !telefone) {
                return res.status(400).json({ message: "Pelo menos um campo deve ser fornecido para atualização." });
            }
            if (nome && nome.trim().length === 0) {
                return res.status(400).json({ message: "O nome não pode ser vazio." });
            }
            if (email) {
                if (email.trim().length === 0) {
                    return res.status(400).json({ message: "O e-mail não pode ser vazio." });
                }
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({ message: "O e-mail fornecido não é válido." });
                }
            }
            if (telefone && telefone.trim().length === 0) {
                return res.status(400).json({ message: "O telefone não pode ser vazio." });
            }
            if (senha) {
                if (senha.trim().length === 0) {
                    return res.status(400).json({ message: "A senha não pode ser vazia." });
                }
                if (senha.length < 6) {
                    return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
                }
                const hashedSenha = yield bcrypt_1.default.hash(senha, 10);
                senha = hashedSenha;
            }
            const updateData = {};
            if (nome)
                updateData.nome = nome;
            if (email)
                updateData.email = email;
            if (senha)
                updateData.senha = senha;
            if (telefone)
                updateData.telefone = telefone;
            const admin = yield Admin_1.Admin.findByIdAndUpdate(id, updateData, { new: true });
            if (!admin) {
                return res.status(404).json({ message: "Administrador não encontrado" });
            }
            res.status(200).json(admin);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao atualizar o admin" });
        }
    });
}
exports.updateAdmin = updateAdmin;
