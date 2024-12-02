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
exports.updateProduto = void 0;
const Produto_1 = require("../../models/Produto");
const mongoose_1 = require("mongoose");
function updateProduto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { nome, descricao, imagem, preco, ingredientes, categoria } = req.body;
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "O ID fornecido é inválido." });
            }
            const produto = yield Produto_1.Produto.findById(id);
            if (!produto) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }
            const updatedFields = {};
            if (nome && nome.trim().length > 0) {
                updatedFields.nome = nome;
            }
            if (descricao && descricao.trim().length > 0) {
                updatedFields.descricao = descricao;
            }
            if (imagem && imagem.trim().length > 0) {
                updatedFields.imagem = imagem;
            }
            if (preco && !isNaN(preco) && preco > 0) {
                updatedFields.preco = Number(preco);
            }
            if (ingredientes && Array.isArray(ingredientes)) {
                updatedFields.ingredientes = ingredientes;
            }
            if (categoria && categoria.trim().length > 0) {
                updatedFields.categoria = categoria;
            }
            const produtoAtualizado = yield Produto_1.Produto.findByIdAndUpdate(id, updatedFields, { new: true });
            if (!produtoAtualizado) {
                return res.status(400).json({ message: "Nenhum campo foi atualizado." });
            }
            res.status(200).json(produtoAtualizado);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao atualizar o produto" });
        }
    });
}
exports.updateProduto = updateProduto;
