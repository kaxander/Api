"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedido = void 0;
const mongoose_1 = require("mongoose");
exports.Pedido = (0, mongoose_1.model)("Pedido", new mongoose_1.Schema({
    mesa: { type: String, required: true },
    status: {
        type: String,
        enum: ["EM_ESPERA", "EM_PRODUÇÃO", "FINALIZADO"],
        default: "EM_ESPERA",
    },
    createdAt: { type: Date, default: Date.now },
    produtos: {
        required: true,
        type: [
            {
                produto: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    required: true,
                    ref: "Produto",
                },
                quantidade: { type: Number, default: 1 },
            },
        ],
    },
    funcionario: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Funcionario",
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Admin",
    },
}));
