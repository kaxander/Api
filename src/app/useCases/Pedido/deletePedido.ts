import { Response, Request } from "express";
import { Pedido } from "../../models/Pedido";
import mongoose from "mongoose";

export async function deletePedido(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const pedido = await Pedido.findByIdAndDelete(id);

    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    res.status(200).json({ message: "Pedido deletado com sucesso.", pedido });

  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o pedido" });
    
  }
}
