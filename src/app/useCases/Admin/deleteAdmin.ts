import { Response, Request } from "express";
import { Admin } from "../../models/Admin";
import { Produto } from "../../models/Produto";
import { Funcionario } from "../../models/Funcionario";
import { Pedido } from "../../models/Pedido";
import { Categoria } from "../../models/Categoria";

export async function deleteAdmin(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await Produto.deleteMany({ adminId: id });
    await Funcionario.deleteMany({ adminId: id });
    await Pedido.deleteMany({ adminId: id });
    await Categoria.deleteMany({ adminId: id });
    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado!" });
    }

    res.status(200).json({ message: "Admin e dados relacionados excluídos com sucesso!" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro ao deletar admin e dados relacionados." });
    
  }
}
