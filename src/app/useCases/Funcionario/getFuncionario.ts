import { Response, Request } from "express";
import { Funcionario } from "../../models/Funcionario";
import mongoose from "mongoose";

export async function getFuncionario(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido fornecido." });
    }

    const funcionario = await Funcionario.findById(id);

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    res.status(200).json(funcionario);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro ao buscar o funcionário." });
    
  }
}
