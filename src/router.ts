import { Router } from "express";
import { listAllAdmins } from "./app/useCases/Admin/listAllAdmins";
import { getAdmin } from "./app/useCases/Admin/getAdmin";
import { createAdmin } from "./app/useCases/Admin/createAdmin";
import { updateAdmin } from "./app/useCases/Admin/updateAdmin";
import { deleteAdmin } from "./app/useCases/Admin/deleteAdmin";
import { createFuncionario } from "./app/useCases/Funcionario/createFuncionario";
import { getFuncionario } from "./app/useCases/Funcionario/getFuncionario";
import { deleteFuncionario } from "./app/useCases/Funcionario/deleteFuncionario";
import { updateFuncionario } from "./app/useCases/Funcionario/updateFuncionario";
import { listAllFuncionariosByAdmin } from "./app/useCases/Admin/listAllFuncionariosByAdmin";
import { createCategoria } from "./app/useCases/Categoria/createCategoria";
import { getCategoria } from "./app/useCases/Categoria/getCategoria";
import { updateCategoria } from "./app/useCases/Categoria/updateCategoria";
import { deleteCategoria } from "./app/useCases/Categoria/deleteCategoria";
import { listAllCategoriasByAdmin } from "./app/useCases/Admin/listAllCategoriasByAdmin";
import { listAllProdutosByAdmin } from "./app/useCases/Admin/listAllProdutosByAdmin";
import { createProduto } from "./app/useCases/Produto/createProduto";
import { getProduto } from "./app/useCases/Produto/getProduto";
import { updateProduto } from "./app/useCases/Produto/updateProduto";
import { deleteProduto } from "./app/useCases/Produto/deleteProduto";
import { listAllProdutosByCategoria } from "./app/useCases/Categoria/listAllProdutosByCategoria";
import { createPedido } from "./app/useCases/Pedido/createPedido";
import { getPedido } from "./app/useCases/Pedido/getPedido";
import { changeStatusByPedido } from "./app/useCases/Pedido/changeStatusByPedido";
import { deletePedido } from "./app/useCases/Pedido/deletePedido";
import { listAllPedidosByAdmin } from "./app/useCases/Admin/listAllPedidosByAdmin";
import { loginAdmin } from "./app/useCases/Admin/loginAdmin";
import { loginFuncionario } from "./app/useCases/Funcionario/loginFuncionario";
import connectToDatabase from "./config/database";

export const router = Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get("/test-connection", async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "Conexão com o MongoDB bem-sucedida!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao conectar ao MongoDB", error });
  }
});

//Lista todos admins
router.get('/admins', listAllAdmins);

//Lista um admin pelo seu Id
router.get('/admin/:id', getAdmin);

//Cria um admin
router.post("/admin", createAdmin);

//Atualiza um admin
router.put('/update/admin/:id', updateAdmin);

//Deleta um admin
router.delete('/delete/admin/:id', deleteAdmin);

//Lista todos os funcionários referente ao admin
router.get('/funcionarios/:id', listAllFuncionariosByAdmin);

//Lista todas as categorias referente ao admin
router.get('/categorias/:id', listAllCategoriasByAdmin)

//Lista todos os produtos referente ao admin
router.get('/produtos/:id', listAllProdutosByAdmin);

//Lista todos os pedidos referente ao admin
router.get('/pedidos/:id', listAllPedidosByAdmin);

router.post("/admin/login", loginAdmin);

//Cria um funcionário
router.post('/funcionario', createFuncionario);

//Busca um funcionário
router.get('/funcionario/:id', getFuncionario); 

//Atualiza um funcionário
router.put('/update/funcionario/:id', updateFuncionario);

//Deleta um funcionário
router.delete('/delete/funcionario/:id', deleteFuncionario);

//Faz o login de um admin
router.post('/funcionario/login', loginFuncionario);

//Cria uma categoria
router.post('/categoria', createCategoria);

//Busca uma categoria
router.get('/categoria/:id', getCategoria);

//Atualiza uma categoria
router.put('/update/categoria/:id', updateCategoria);

//Deleta uma categoria
router.delete('/delete/categoria/:id', deleteCategoria);

//Busca todos os produtos de uma categoria
router.get('/categoria/produtos/:id', listAllProdutosByCategoria);

//Cria um produto
router.post('/produto', createProduto);

//Busca um produto
router.get('/produto/:id', getProduto);

//Atualiza um produto
router.put('/update/produto/:id', updateProduto);

//Deleta um produto
router.delete('/delete/produto/:id', deleteProduto);

//Cria um pedido
router.post('/pedido', createPedido);

//Busca um pedido
router.get('/pedido/:id', getPedido);

//Altera o status de um pedido
router.patch('/change/pedido/:id', changeStatusByPedido);

//Deleta um pedido
router.delete('/delete/pedido/:id', deletePedido);