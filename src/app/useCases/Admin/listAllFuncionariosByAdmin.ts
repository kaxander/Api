import { Response, Request } from "express";
import { Funcionario } from "../../models/Funcionario";

export async function listAllFuncionariosByAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "O ID do admin é obrigatório." });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    const funcionarios = await Funcionario.find().where("admin").equals(id);

    if (!funcionarios || funcionarios.length === 0) {
      return res.status(404).json({ message: "Não há funcionários associados a este admin." });
    }

    res.status(200).json(funcionarios);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os funcionários" });
    
  }
}
