import { model, Schema } from "mongoose";

export const Categoria = model(
  "Categoria",
  new Schema({
    nome: { type: String, required: true },
    icone: { type: String},
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    }
  })
)