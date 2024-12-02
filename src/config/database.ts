import mongoose from "mongoose";

let isConnected = false; // Para rastrear o estado da conexão

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Já conectado ao MongoDB Atlas");
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MongoDB URI não configurada nas variáveis de ambiente.");
    }

    const db = await mongoose.connect(mongoUri);

    isConnected = db.connections[0].readyState === 1;
    console.log("Conectado ao MongoDB Atlas");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error; // Deixe a aplicação saber que a conexão falhou
  }
};

export default connectToDatabase;
