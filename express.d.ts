import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Adiciona a propriedade 'user' sem alterar os outros tipos.
    }
  }
}
