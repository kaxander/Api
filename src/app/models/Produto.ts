import { model, Schema } from "mongoose";

export const Produto = model(
  "Produto",
  new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    imagem: { type: String, required: true },
    preco: { type: Number, required: true },
    ingredientes: [{ type: String, required: true }],
    categoria: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Categoria",
    },
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    }
  })
)