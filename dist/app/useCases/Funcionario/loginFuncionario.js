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
exports.loginFuncionario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Funcionario_1 = require("./../../models/Funcionario");
const JWT_SECRET = "seuSegredoSuperSeguro";
function loginFuncionario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, senha } = req.body;
            const funcionario = yield Funcionario_1.Funcionario.findOne({ email: email });
            if (!funcionario) {
                return res.status(404).json({ message: "Funcionario não encontrado." });
            }
            const passwordMatch = yield bcrypt_1.default.compare(senha, funcionario.senha);
            if (passwordMatch) {
                const token = jsonwebtoken_1.default.sign({ id: funcionario._id }, JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.status(200).json({ token });
            }
            else {
                res.status(401).json({ message: "Senha incorreta." });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao fazer login." });
        }
    });
}
exports.loginFuncionario = loginFuncionario;
