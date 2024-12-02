import { Response, Request } from "express";
import { Produto } from "../../models/Produto";
import { Types } from "mongoose"; 

export async function getProduto(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "O ID fornecido é inválido." });
    }

    const produto = await Produto.findById(id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.status(200).json(produto);

  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar o produto" });
    
  }
}
