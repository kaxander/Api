import { model, Schema } from "mongoose";

export const Pedido = model(
  "Pedido",
  new Schema({
    mesa: { type: String, required: true },
    status: {
      type: String,
      enum: ["EM_ESPERA", "EM_PRODUÇÃO", "FINALIZADO"],
      default: "EM_ESPERA",
    },
    createdAt: { type: Date, default: Date.now },
    produtos: {
      required: true,
      type: [
        {
          produto: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Produto",
          },
          quantidade: { type: Number, default: 1 },
        },
      ],
    },
    funcionario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Funcionario",
    },
    admin: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
  })
);