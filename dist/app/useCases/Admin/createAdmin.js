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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = void 0;
const Admin_1 = require("../../models/Admin");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome, email, senha, telefone } = req.body;
            if (!nome) {
                return res.status(400).json({ message: "O campo nome é obrigatório." });
            }
            if (!email) {
                return res.status(400).json({ message: "O campo email é obrigatório." });
            }
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "O campo email não tem um formato válido." });
            }
            if (!senha) {
                return res.status(400).json({ message: "O campo senha é obrigatório." });
            }
            if (senha.length < 6) {
                return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
            }
            if (!telefone) {
                return res.status(400).json({ message: "O campo telefone é obrigatório." });
            }
            const telefoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!telefoneRegex.test(telefone)) {
                return res.status(400).json({ message: "O telefone informado não é válido." });
            }
            const adminExistente = yield Admin_1.Admin.findOne({ $or: [{ email }, { telefone }] });
            if (adminExistente) {
                return res.status(400).json({ message: "Admin com esse email ou telefone já existe." });
            }
            let senhaCriptografada;
            try {
                senhaCriptografada = yield bcrypt_1.default.hash(senha, 10);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Erro ao criptografar a senha." });
            }
            let admin;
            try {
                admin = yield Admin_1.Admin.create({
                    nome,
                    email,
                    senha: senhaCriptografada,
                    telefone,
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Erro ao criar o admin no banco de dados." });
            }
            const _a = admin.toObject(), { senha: _ } = _a, adminSemSenha = __rest(_a, ["senha"]);
            res.status(201).json(adminSemSenha);
        }
        catch (error) {
            if (error === 'ValidationError') {
                return res.status(400).json({ message: `Erro de validação: ${error}` });
            }
            // 10. Erro genérico no servidor
            console.error(error);
            res.status(500).json({ message: "Erro ao criar o admin" });
        }
    });
}
exports.createAdmin = createAdmin;
