import { Response, Request } from "express";
import { Categoria } from '../../models/Categoria';

export async function listAllCategoriasByAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "O ID do admin é obrigatório." });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    const categorias = await Categoria.find().where("admin").equals(id);

    if (!categorias || categorias.length === 0) {
      return res.status(404).json({ message: "Não há categorias associadas a este admin." });
    }

    res.status(200).json(categorias);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao buscar as categorias" });
    
  }
}
