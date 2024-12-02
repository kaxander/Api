import { model, Schema } from "mongoose";

export const Funcionario = model(
  "Funcionario",
  new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: Number, required: true, unique: true },
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
      unique: false,
    }
  })
)