import { Request, Response } from "express";
import { Funcionario } from "../../models/Funcionario";
import bcrypt from "bcrypt";

export async function updateFuncionario(req: Request, res: Response) {
  try {
    const { id } = req.params;
    let { nome, email, senha, telefone } = req.body;

    if (!id) {
      return res.status(400).json({ message: "O ID do funcionário é obrigatório." });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ message: "O ID fornecido não é válido." });
    }

    if (!nome && !email && !senha && !telefone) {
      return res.status(400).json({ message: "Pelo menos um campo deve ser fornecido para atualização." });
    }

    if (nome && nome.trim().length === 0) {
      return res.status(400).json({ message: "O nome não pode ser vazio." });
    }

    if (email) {
      if (email.trim().length === 0) {
        return res.status(400).json({ message: "O e-mail não pode ser vazio." });
      }
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "O e-mail fornecido não é válido." });
      }
    }

    if (telefone && telefone.trim().length === 0) {
      return res.status(400).json({ message: "O telefone não pode ser vazio." });
    }

    if (senha) {
      if (senha.trim().length === 0) {
        return res.status(400).json({ message: "A senha não pode ser vazia." });
      }
      if (senha.length < 6) {
        return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres." });
      }
      const hashedSenha = await bcrypt.hash(senha, 10);
      senha = hashedSenha;
    }

    const updateData: any = {};
    if (nome) updateData.nome = nome;
    if (email) updateData.email = email;
    if (senha) updateData.senha = senha;
    if (telefone) updateData.telefone = telefone;

    const funcionario = await Funcionario.findByIdAndUpdate(id, updateData, { new: true });

    if (!funcionario) {
      return res.status(404).json({ message: "Funcionário não encontrado." });
    }
    res.status(200).json(funcionario);

  } catch (error) {
    
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar o funcionário" });
    
  }
}
