"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let isConnected = false; // Para rastrear o estado da conexão
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (isConnected) {
        console.log("Já conectado ao MongoDB Atlas");
        return;
    }
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MongoDB URI não configurada nas variáveis de ambiente.");
        }
        const db = yield mongoose_1.default.connect(mongoUri);
        isConnected = db.connections[0].readyState === 1;
        console.log("Conectado ao MongoDB Atlas");
    }
    catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error; // Deixe a aplicação saber que a conexão falhou
    }
});
exports.default = connectToDatabase;
