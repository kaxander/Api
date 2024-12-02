import { Response, Request } from "express";
import { Funcionario } from "../../models/Funcionario";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function createFuncionario(req: Request, res: Response) {
  try {
    const { nome, email, senha, telefone, admin } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "O nome do funcionário é obrigatório." });
    }
    if (nome.trim().length === 0) {
      return res.status(400).json({ message: "O nome do funcionário não pode ser vazio." });
    }

    if (!email) {
      return res.status(400).json({ message: "O e-mail do funcionário é obrigatório." });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "O e-mail fornecido não é válido." });
    }

    if (!senha) {
      return res.status(400).json({ message: "A senha do funcionário é obrigatória." });
    }
    if (senha.length < 6) {
      return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
    }

    if (!telefone) {
      return res.status(400).json({ message: "O telefone do funcionário é obrigatório." });
    }
    if (telefone.trim().length === 0) {
      return res.status(400).json({ message: "O telefone não pode ser vazio." });
    }

    if (!admin) {
      return res.status(400).json({ message: "O campo 'admin' (ID do administrador) é obrigatório." });
    }
    if (!mongoose.Types.ObjectId.isValid(admin)) {
      return res.status(400).json({ message: "O ID do administrador fornecido não é válido." });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const funcionario = await Funcionario.create({
      nome,
      email,
      senha: hashedSenha,
      telefone,
      admin,
    });

    res.status(201).json(funcionario);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro ao criar o funcionário." });
    
  }
}
