import { Response, Request } from "express";
import { Admin } from "../../models/Admin";

export async function listAllAdmins(req: Request, res: Response) {
  try {

    const admins = await Admin.find({})
    res.status(200).json(admins);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Erro ao buscar os admins" })
    
  }
}