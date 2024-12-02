import { model, Schema } from "mongoose";


export const Admin = model(
  "Admin",
  new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    telefone: { type: Number, required: true, unique: true },
  })
)