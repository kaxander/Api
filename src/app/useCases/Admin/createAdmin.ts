import { Request, Response } from "express";
import { Admin } from "../../models/Admin";
import bcrypt from "bcrypt";

export async function createAdmin(req: Request, res: Response) {
  try {
    const { nome, email, senha, telefone } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "O campo nome é obrigatório." });
    }

    if (!email) {
      return res.status(400).json({ message: "O campo email é obrigatório." });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "O campo email não tem um formato válido." });
    }

    if (!senha) {
      return res.status(400).json({ message: "O campo senha é obrigatório." });
    }

    if (senha.length < 6) {
      return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
    }

    if (!telefone) {
      return res.status(400).json({ message: "O campo telefone é obrigatório." });
    }

    const telefoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!telefoneRegex.test(telefone)) {
      return res.status(400).json({ message: "O telefone informado não é válido." });
    }

    const adminExistente = await Admin.findOne({ $or: [{ email }, { telefone }] });
    if (adminExistente) {
      return res.status(400).json({ message: "Admin com esse email ou telefone já existe." });
    }

    let senhaCriptografada;
    try {
      senhaCriptografada = await bcrypt.hash(senha, 10);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criptografar a senha." });
    }

    let admin;
    try {
      admin = await Admin.create({
        nome,
        email,
        senha: senhaCriptografada,
        telefone,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar o admin no banco de dados." });
    }

    const { senha: _, ...adminSemSenha } = admin.toObject();
    res.status(201).json(adminSemSenha);

  } catch (error) {
    
    if (error === 'ValidationError') {
      return res.status(400).json({ message: `Erro de validação: ${error}` });
    }

    // 10. Erro genérico no servidor
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o admin" });
  }
}
