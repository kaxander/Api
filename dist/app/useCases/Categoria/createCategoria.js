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
exports.createCategoria = void 0;
const Categoria_1 = require("../../models/Categoria");
function createCategoria(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome, icone, admin } = req.body;
            if (!nome || !admin) {
                return res.status(400).json({ message: "Os campos 'nome' e 'admin' são obrigatórios." });
            }
            if (nome.length < 3) {
                return res.status(400).json({ message: "O nome da categoria deve ter pelo menos 3 caracteres." });
            }
            if (!/^[0-9a-fA-F]{24}$/.test(admin)) {
                return res.status(400).json({ message: "O ID do administrador fornecido é inválido." });
            }
            const categoria = yield Categoria_1.Categoria.create({
                nome,
                icone,
                admin
            });
            res.status(201).json(categoria);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erro ao criar a categoria" });
        }
    });
}
exports.createCategoria = createCategoria;
