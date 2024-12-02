import { Response, Request } from "express";
import { Produto } from "../../models/Produto";

export async function listAllProdutosByAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "O ID do admin é obrigatório." });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    const produtos = await Produto.find().where("admin").equals(id);

    if (!produtos || produtos.length === 0) {
      return res.status(404).json({ message: "Não há produtos associados a este admin." });
    }

    res.status(200).json(produtos);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os produtos" });
    
  }
}
