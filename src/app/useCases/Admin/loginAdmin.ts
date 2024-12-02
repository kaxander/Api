import { Request, Response } from "express";
import { Admin } from "../../models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "seuSegredoSuperSeguro";


export async function loginAdmin(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin não encontrado." });
    }

    const passwordMatch = await bcrypt.compare(senha, admin.senha);

    if (passwordMatch) {
      const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
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
