import jwt from "jsonwebtoken";
import ClienteModel from "../model/clienteModel";
const JWT_SECRET = process.env.JWT_SECRET || "segredo_bem_secreto";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (cliente: ClienteModel): string => {
  return jwt.sign({ cliente }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
