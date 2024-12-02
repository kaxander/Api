import { Response, Request } from "express";
import { Produto } from '../../models/Produto';
import mongoose from 'mongoose';

export async function listAllProdutosByCategoria(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID da categoria inválido." });
    }

    const produtos = await Produto.find().where("categoria").equals(id);

    if (produtos.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado para esta categoria." });
    }

    res.status(200).json(produtos);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro ao buscar os produtos da categoria." });
    
  }
}
