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
const mongoose_1 = __importDefault(require("mongoose"));
const Admin_1 = require("../../models/Admin");
const Produto_1 = require("../../models/Produto");
const Funcionario_1 = require("../../models/Funcionario");
const Categoria_1 = require("../../models/Categoria");
const Pedido_1 = require("../../models/Pedido");
function clearDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Conectando ao MongoDB (local ou Atlas, dependendo da URL)
            const mongoURI = "mongodb+srv://admin:729863@foodnow.pwhps.mongodb.net/?retryWrites=true&w=majority&appName=Foodnow"; // Ou substitua com o seu link do MongoDB Atlas
            yield mongoose_1.default.connect(mongoURI);
            // Apagar todos os dados de cada coleção
            yield Admin_1.Admin.deleteMany({});
            yield Produto_1.Produto.deleteMany({});
            yield Funcionario_1.Funcionario.deleteMany({});
            yield Categoria_1.Categoria.deleteMany({});
            yield Pedido_1.Pedido.deleteMany({});
            // Adicione mais coleções conforme necessário
            console.log("Todos os dados foram apagados!");
        }
        catch (error) {
            console.error("Erro ao limpar o banco de dados", error);
        }
        finally {
            // Desconectando do MongoDB após a operação
            yield mongoose_1.default.disconnect();
        }
    });
}
clearDb();
