import { Response, Request } from "express";
import { Categoria } from "../../models/Categoria";

export async function createCategoria(req: Request, res: Response) {
  try {
    const { nome, icone, admin } = req.body;

    if (!nome || !admin) {
      return res.status(400).json({ message: "Os campos 'nome' e 'admin' são obrigatórios." });
    }

    if (nome.length < 3) {
      return res.status(400).json({ message: "O nome da categoria deve ter pelo menos 3 caracteres." });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(admin)) {
      return res.status(400).json({ message: "O ID do administrador fornecido é inválido." });
    }

    const categoria = await Categoria.create({
      nome,
      icone,
      admin
    });

    res.status(201).json(categoria);

  } catch (error) {
   
    console.log(error);
    res.status(500).json({ message: "Erro ao criar a categoria" });
    
  }
}
