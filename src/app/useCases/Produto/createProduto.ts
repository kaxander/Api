import { Response, Request } from "express";
import { Produto } from "../../models/Produto";
import { Categoria } from "../../models/Categoria"; 
import { Admin } from "../../models/Admin"; 
import { Types } from "mongoose"; 

export async function createProduto(req: Request, res: Response) {
  try {
    const { nome, descricao, imagem, preco, ingredientes, categoria, admin } = req.body;

    if (!nome || nome.trim().length === 0) {
      return res.status(400).json({ message: "O campo 'nome' é obrigatório e não pode ser vazio." });
    }

    if (!descricao || descricao.trim().length === 0) {
      return res.status(400).json({ message: "O campo 'descricao' é obrigatório e não pode ser vazio." });
    }

    if (!preco) {
      return res.status(400).json({ message: "O campo 'preco' é obrigatório." });
    }
    if (isNaN(preco) || preco <= 0) {
      return res.status(400).json({ message: "O campo 'preco' deve ser um número positivo válido." });
    }

    if (!categoria || categoria.trim().length === 0) {
      return res.status(400).json({ message: "O campo 'categoria' é obrigatório e não pode ser vazio." });
    }

    if (!admin || admin.trim().length === 0) {
      return res.status(400).json({ message: "O campo 'admin' é obrigatório e não pode ser vazio." });
    }

    if (ingredientes && !Array.isArray(ingredientes)) {
      return res.status(400).json({ message: "O campo 'ingredientes', se fornecido, deve ser uma lista." });
    }

    if (!imagem || imagem.trim().length === 0) {
      return res.status(400).json({ message: "O campo 'imagem' é obrigatório e não pode ser vazio." });
    }

    if (!Types.ObjectId.isValid(categoria)) {
      return res.status(400).json({ message: "O ID da categoria fornecido é inválido." });
    }

    if (!Types.ObjectId.isValid(admin)) {
      return res.status(400).json({ message: "O ID do admin fornecido é inválido." });
    }

    const categoriaExistente = await Categoria.findById(categoria);
    if (!categoriaExistente) {
      return res.status(404).json({ message: "A categoria fornecida não existe." });
    }

    const adminExistente = await Admin.findById(admin);
    if (!adminExistente) {
      return res.status(404).json({ message: "O admin fornecido não existe." });
    }

    const produto = await Produto.create({
      nome,
      descricao,
      imagem,
      preco: Number(preco),
      ingredientes,
      categoria,
      admin,
    });

    res.status(201).json(produto);

  } catch (error) {
   
    console.error(error);
    res.status(500).json({ message: "Erro ao criar o produto", error });
    
  }
}
