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
exports.createPedido = void 0;
const Pedido_1 = require("../../models/Pedido");
const Funcionario_1 = require("../../models/Funcionario");
const Admin_1 = require("../../models/Admin");
function createPedido(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mesa, produtos, funcionario, admin } = req.body;
            if (!mesa || mesa.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'mesa' é obrigatório e não pode ser vazio." });
            }
            if (!Array.isArray(produtos) || produtos.length === 0) {
                return res.status(400).json({ message: "A lista de produtos não pode estar vazia." });
            }
            if (!funcionario || funcionario.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'funcionario' é obrigatório e não pode ser vazio." });
            }
            if (!admin || admin.trim().length === 0) {
                return res.status(400).json({ message: "O campo 'admin' é obrigatório e não pode ser vazio." });
            }
            const funcionarioExistente = yield Funcionario_1.Funcionario.findById(funcionario);
            if (!funcionarioExistente) {
                return res.status(404).json({ message: "Funcionário não encontrado." });
            }
            const adminExistente = yield Admin_1.Admin.findById(admin);
            if (!adminExistente) {
                return res.status(404).json({ message: "Admin não encontrado." });
            }
            const pedido = yield Pedido_1.Pedido.create({
                mesa,
                produtos,
                funcionario,
                admin
            });
            res.status(201).json({
                message: "Pedido criado com sucesso.",
                pedido: pedido
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao criar o pedido" });
        }
    });
}
exports.createPedido = createPedido;
