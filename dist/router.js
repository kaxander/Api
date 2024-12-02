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
exports.router = void 0;
const express_1 = require("express");
const listAllAdmins_1 = require("./app/useCases/Admin/listAllAdmins");
const getAdmin_1 = require("./app/useCases/Admin/getAdmin");
const createAdmin_1 = require("./app/useCases/Admin/createAdmin");
const updateAdmin_1 = require("./app/useCases/Admin/updateAdmin");
const deleteAdmin_1 = require("./app/useCases/Admin/deleteAdmin");
const createFuncionario_1 = require("./app/useCases/Funcionario/createFuncionario");
const getFuncionario_1 = require("./app/useCases/Funcionario/getFuncionario");
const deleteFuncionario_1 = require("./app/useCases/Funcionario/deleteFuncionario");
const updateFuncionario_1 = require("./app/useCases/Funcionario/updateFuncionario");
const listAllFuncionariosByAdmin_1 = require("./app/useCases/Admin/listAllFuncionariosByAdmin");
const createCategoria_1 = require("./app/useCases/Categoria/createCategoria");
const getCategoria_1 = require("./app/useCases/Categoria/getCategoria");
const updateCategoria_1 = require("./app/useCases/Categoria/updateCategoria");
const deleteCategoria_1 = require("./app/useCases/Categoria/deleteCategoria");
const listAllCategoriasByAdmin_1 = require("./app/useCases/Admin/listAllCategoriasByAdmin");
const listAllProdutosByAdmin_1 = require("./app/useCases/Admin/listAllProdutosByAdmin");
const createProduto_1 = require("./app/useCases/Produto/createProduto");
const getProduto_1 = require("./app/useCases/Produto/getProduto");
const updateProduto_1 = require("./app/useCases/Produto/updateProduto");
const deleteProduto_1 = require("./app/useCases/Produto/deleteProduto");
const listAllProdutosByCategoria_1 = require("./app/useCases/Categoria/listAllProdutosByCategoria");
const createPedido_1 = require("./app/useCases/Pedido/createPedido");
const getPedido_1 = require("./app/useCases/Pedido/getPedido");
const changeStatusByPedido_1 = require("./app/useCases/Pedido/changeStatusByPedido");
const deletePedido_1 = require("./app/useCases/Pedido/deletePedido");
const listAllPedidosByAdmin_1 = require("./app/useCases/Admin/listAllPedidosByAdmin");
const loginAdmin_1 = require("./app/useCases/Admin/loginAdmin");
const loginFuncionario_1 = require("./app/useCases/Funcionario/loginFuncionario");
const database_1 = __importDefault(require("./config/database"));
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.router.get("/test-connection", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        res.status(200).json({ message: "Conexão com o MongoDB bem-sucedida!" });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao conectar ao MongoDB", error });
    }
}));
//Lista todos admins
exports.router.get('/admins', listAllAdmins_1.listAllAdmins);
//Lista um admin pelo seu Id
exports.router.get('/admin/:id', getAdmin_1.getAdmin);
//Cria um admin
exports.router.post("/admin", createAdmin_1.createAdmin);
//Atualiza um admin
exports.router.put('/update/admin/:id', updateAdmin_1.updateAdmin);
//Deleta um admin
exports.router.delete('/delete/admin/:id', deleteAdmin_1.deleteAdmin);
//Lista todos os funcionários referente ao admin
exports.router.get('/funcionarios/:id', listAllFuncionariosByAdmin_1.listAllFuncionariosByAdmin);
//Lista todas as categorias referente ao admin
exports.router.get('/categorias/:id', listAllCategoriasByAdmin_1.listAllCategoriasByAdmin);
//Lista todos os produtos referente ao admin
exports.router.get('/produtos/:id', listAllProdutosByAdmin_1.listAllProdutosByAdmin);
//Lista todos os pedidos referente ao admin
exports.router.get('/pedidos/:id', listAllPedidosByAdmin_1.listAllPedidosByAdmin);
exports.router.post("/admin/login", loginAdmin_1.loginAdmin);
//Cria um funcionário
exports.router.post('/funcionario', createFuncionario_1.createFuncionario);
//Busca um funcionário
exports.router.get('/funcionario/:id', getFuncionario_1.getFuncionario);
//Atualiza um funcionário
exports.router.put('/update/funcionario/:id', updateFuncionario_1.updateFuncionario);
//Deleta um funcionário
exports.router.delete('/delete/funcionario/:id', deleteFuncionario_1.deleteFuncionario);
//Faz o login de um admin
exports.router.post('/funcionario/login', loginFuncionario_1.loginFuncionario);
//Cria uma categoria
exports.router.post('/categoria', createCategoria_1.createCategoria);
//Busca uma categoria
exports.router.get('/categoria/:id', getCategoria_1.getCategoria);
//Atualiza uma categoria
exports.router.put('/update/categoria/:id', updateCategoria_1.updateCategoria);
//Deleta uma categoria
exports.router.delete('/delete/categoria/:id', deleteCategoria_1.deleteCategoria);
//Busca todos os produtos de uma categoria
exports.router.get('/categoria/produtos/:id', listAllProdutosByCategoria_1.listAllProdutosByCategoria);
//Cria um produto
exports.router.post('/produto', createProduto_1.createProduto);
//Busca um produto
exports.router.get('/produto/:id', getProduto_1.getProduto);
//Atualiza um produto
exports.router.put('/update/produto/:id', updateProduto_1.updateProduto);
//Deleta um produto
exports.router.delete('/delete/produto/:id', deleteProduto_1.deleteProduto);
//Cria um pedido
exports.router.post('/pedido', createPedido_1.createPedido);
//Busca um pedido
exports.router.get('/pedido/:id', getPedido_1.getPedido);
//Altera o status de um pedido
exports.router.patch('/change/pedido/:id', changeStatusByPedido_1.changeStatusByPedido);
//Deleta um pedido
exports.router.delete('/delete/pedido/:id', deletePedido_1.deletePedido);
