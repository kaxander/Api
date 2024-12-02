import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Funcionario } from './../../models/Funcionario';

const JWT_SECRET = "seuSegredoSuperSeguro";

export async function loginFuncionario(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    const funcionario = await Funcionario.findOne({ email: email });

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionario não encontrado." });
    }

    const passwordMatch = await bcrypt.compare(senha, funcionario.senha);

    if (passwordMatch) {
      const token = jwt.sign({ id: funcionario._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Senha incorreta." });
    }

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login." });
    
  }
}
