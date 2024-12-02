import { Response, Request } from "express";
import { Categoria } from "../../models/Categoria";

export async function updateCategoria(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, icone } = req.body;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    if (nome && nome.trim().length === 0) {
      return res.status(400).json({ message: "O nome da categoria não pode ser vazio." });
    }

    if (icone && icone.trim().length === 0) {
      return res.status(400).json({ message: "O ícone da categoria não pode ser vazio." });
    }

    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    const updateData: { nome?: string; icone?: string } = {};

    if (nome) updateData.nome = nome; 
    if (icone !== undefined) updateData.icone = icone;

    const updatedCategoria = await Categoria.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(updatedCategoria);

  } catch (error) {
    
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar a categoria" });
    
  }
}
