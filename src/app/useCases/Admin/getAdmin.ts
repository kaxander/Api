import { Request, Response } from "express";
import { Admin } from "../../models/Admin";

export async function getAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "O ID do admin é obrigatório." });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado." });
    }

    res.status(200).json(admin);
    
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao buscar o admin" });
    
  }
}
