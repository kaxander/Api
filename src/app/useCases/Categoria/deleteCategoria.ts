import { Response, Request } from "express";
import { Categoria } from "../../models/Categoria";

export async function deleteCategoria(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID da categoria fornecido é inválido." });
    }

    const categoria = await Categoria.findByIdAndDelete(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    res.status(200).json({ message: "Categoria deletada com sucesso.", categoria });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro ao deletar a categoria" });
    
  }
}
