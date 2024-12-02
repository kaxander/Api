import { Response, Request } from "express";
import { Funcionario } from "../../models/Funcionario";

export async function deleteFuncionario(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    const funcionario = await Funcionario.findByIdAndDelete(id);

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }

    res.status(200).json({ message: "Funcionário deletado com sucesso.", funcionario });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro ao deletar o funcionário" });
    
  }
}
