import { Response, Request } from "express";
import { Pedido } from "../../models/Pedido";
import { Funcionario } from "../../models/Funcionario"; 
import { Admin } from "../../models/Admin"; 

export async function createPedido(req: Request, res: Response) {
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

    const funcionarioExistente = await Funcionario.findById(funcionario);
    if (!funcionarioExistente) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    const adminExistente = await Admin.findById(admin);
    if (!adminExistente) {
      return res.status(404).json({ message: "Admin não encontrado." });
    }

    const pedido = await Pedido.create({
      mesa,
      produtos,
      funcionario,
      admin
    });

    res.status(201).json({
      message: "Pedido criado com sucesso.",
      pedido: pedido
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao criar o pedido" });
    
  }
}
