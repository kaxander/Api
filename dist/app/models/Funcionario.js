"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcionario = void 0;
const mongoose_1 = require("mongoose");
exports.Funcionario = (0, mongoose_1.model)("Funcionario", new mongoose_1.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: Number, required: true, unique: true },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
        unique: false,
    }
}));
