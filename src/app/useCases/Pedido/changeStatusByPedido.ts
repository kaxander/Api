import { Request, Response } from "express";
import { Pedido } from "../../models/Pedido";
import mongoose from "mongoose";

export async function changeStatusByPedido(
  req: Request<{ id: string }, any, { status: string }, any>,
  res: Response
): Promise<Response> {  
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID do pedido inválido." });
    }

    if (!["EM_ESPERA", "EM_PRODUÇÃO", "FINALIZADO"].includes(status)) {
      return res.status(400).json({
        error: "O status deve ser um destes: EM_ESPERA, EM_PRODUÇÃO, FINALIZADO",
      });
    }

    const pedidoAtualizado = await Pedido.findByIdAndUpdate(id, { status }, { new: true });

    if (!pedidoAtualizado) {
      return res.status(404).json({ message: "Pedido não encontrado." });
    }

    return res.sendStatus(204);  // Retornando a resposta corretamente
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao alterar o status" });
  }
}
