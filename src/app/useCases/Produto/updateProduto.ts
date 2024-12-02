import { Response, Request } from "express";
import { Produto } from "../../models/Produto";
import { Types } from "mongoose";

export async function updateProduto(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, descricao, imagem, preco, ingredientes, categoria } = req.body;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "O ID fornecido é inválido." });
    }

    const produto = await Produto.findById(id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    const updatedFields: any = {};

    if (nome && nome.trim().length > 0) {
      updatedFields.nome = nome;
    }

    if (descricao && descricao.trim().length > 0) {
      updatedFields.descricao = descricao;
    }

    if (imagem && imagem.trim().length > 0) {
      updatedFields.imagem = imagem;
    }

    if (preco && !isNaN(preco) && preco > 0) {
      updatedFields.preco = Number(preco);
    }

    if (ingredientes && Array.isArray(ingredientes)) {
      updatedFields.ingredientes = ingredientes;
    }

    if (categoria && categoria.trim().length > 0) {
      updatedFields.categoria = categoria;
    }

    const produtoAtualizado = await Produto.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!produtoAtualizado) {
      return res.status(400).json({ message: "Nenhum campo foi atualizado." });
    }

    res.status(200).json(produtoAtualizado);

  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar o produto" });
    
  }
}
