"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
const mongoose_1 = require("mongoose");
exports.Produto = (0, mongoose_1.model)("Produto", new mongoose_1.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    imagem: { type: String, required: true },
    preco: { type: Number, required: true },
    ingredientes: [{ type: String, required: true }],
    categoria: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Categoria",
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    }
}));
