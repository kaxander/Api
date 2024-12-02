import { Response, Request } from "express";
import { Produto } from "../../models/Produto";
import { Types } from "mongoose"; 

export async function deleteProduto(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "O ID fornecido é inválido." });
    }

    const produto = await Produto.findByIdAndDelete(id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.status(200).json({ message: "Produto deletado com sucesso.", produto });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o produto" });
    
  }
}
