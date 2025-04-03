import { Request, Response } from "express";
import ClienteModel from "../model/clienteModel";
import { generateToken } from "../utils/jwt";

export const loginCliente = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const cliente = await ClienteModel.findOne({ where: { email } });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    const isValidPassword = senha === cliente.senha; // Substituir por hash seguro
    if (!isValidPassword) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    const token = generateToken(cliente);
    res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor", details: error });
  }
};
