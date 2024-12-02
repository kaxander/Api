import { Response, Request } from "express";
import { Pedido } from "../../models/Pedido";

export async function listAllPedidosByAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "O ID do admin é obrigatório." });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    const pedidos = await Pedido.find().where("admin").equals(id);

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ message: "Não há pedidos associados a este admin." });
    }

    res.status(200).json(pedidos);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os pedidos" });
    
  }
}
