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
exports.createProduto = void 0;
const Produto_1 = require("../../models/Produto");
const Categoria_1 = require("../../models/Categoria");
const Admin_1 = require("../../models/Admin");
const mongoose_1 = require("mongoose");
function createProduto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome, descricao, imagem, preco, ingredientes, categoria, admin } = req.body;
            if (!nome || nome.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'nome' é obrigatório e não pode ser vazio." });
            }
            if (!descricao || descricao.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'descricao' é obrigatório e não pode ser vazio." });
            }
            if (!preco) {
                return res.status(400).json({ message: "O campo 'preco' é obrigatório." });
            }
            if (isNaN(preco) || preco <= 0) {
                return res.status(400).json({ message: "O campo 'preco' deve ser um número positivo válido." });
            }
            if (!categoria || categoria.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'categoria' é obrigatório e não pode ser vazio." });
            }
            if (!admin || admin.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'admin' é obrigatório e não pode ser vazio." });
            }
            if (ingredientes && !Array.isArray(ingredientes)) {
                return res.status(400).json({ message: "O campo 'ingredientes', se fornecido, deve ser uma lista." });
            }
            if (!imagem || imagem.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'imagem' é obrigatório e não pode ser vazio." });
            }
            if (!mongoose_1.Types.ObjectId.isValid(categoria)) {
                return res.status(400).json({ message: "O ID da categoria fornecido é inválido." });
            }
            if (!mongoose_1.Types.ObjectId.isValid(admin)) {
                return res.status(400).json({ message: "O ID do admin fornecido é inválido." });
            }
            const categoriaExistente = yield Categoria_1.Categoria.findById(categoria);
            if (!categoriaExistente) {
                return res.status(404).json({ message: "A categoria fornecida não existe." });
            }
            const adminExistente = yield Admin_1.Admin.findById(admin);
            if (!adminExistente) {
                return res.status(404).json({ message: "O admin fornecido não existe." });
            }
            const produto = yield Produto_1.Produto.create({
                nome,
                descricao,
                imagem,
                preco: Number(preco),
                ingredientes,
                categoria,
                admin,
            });
            res.status(201).json(produto);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao criar o produto", error });
        }
    });
}
exports.createProduto = createProduto;
