import mongoose from "mongoose";
import { Admin } from "../../models/Admin";
import { Produto } from "../../models/Produto";
import { Funcionario } from "../../models/Funcionario";
import { Categoria } from "../../models/Categoria";
import { Pedido } from "../../models/Pedido";

async function clearDb() {
  try {
    // Conectando ao MongoDB (local ou Atlas, dependendo da URL)
    const mongoURI = "mongodb+srv://admin:729863@foodnow.pwhps.mongodb.net/?retryWrites=true&w=majority&appName=Foodnow"; // Ou substitua com o seu link do MongoDB Atlas
    await mongoose.connect(mongoURI);

    // Apagar todos os dados de cada coleção
    await Admin.deleteMany({});
    await Produto.deleteMany({});
    await Funcionario.deleteMany({});
    await Categoria.deleteMany({});
    await Pedido.deleteMany({});
    // Adicione mais coleções conforme necessário

    console.log("Todos os dados foram apagados!");
  } catch (error) {
    console.error("Erro ao limpar o banco de dados", error);
  } finally {
    // Desconectando do MongoDB após a operação
    await mongoose.disconnect();
  }
}

clearDb();
