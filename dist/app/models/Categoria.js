"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
const mongoose_1 = require("mongoose");
exports.Categoria = (0, mongoose_1.model)("Categoria", new mongoose_1.Schema({
    nome: { type: String, required: true },
    icone: { type: String },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    }
}));
