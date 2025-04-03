import { Request, Response } from "express";
import ClienteModel from "../model/clienteModel";

export const getAll = async (req: Request, res: Response) => {
  const cliente = await ClienteModel.findAll();
  res.send(cliente);
};

export const getClienteById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await ClienteModel.findByPk(req.params.id);

  return res.json(user);
};

export const createCliente = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Values required" });
    }

    const cliente = await ClienteModel.create({ nome, email, senha });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const updateCliente = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;
    const loggedClienteModel = req.body.user;
    console.log("logged", loggedClienteModel);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Values required" });
    }

    const cliente = await ClienteModel.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "User not found" });
    }

    cliente.nome = name;
    cliente.email = email;
    cliente.senha = password;
    cliente.updatedBy = loggedClienteModel.cliente.id;

    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyClienteById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const cliente = await ClienteModel.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "User not found" });
    }

    await cliente.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
