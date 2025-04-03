import { Request, Response } from "express";
import EstoqueModel from "../model/estoqueModel";

export const getAll = async (req: Request, res: Response) => {
  const estoque = await EstoqueModel.findAll();
  res.send(estoque);
};

export const getEstoqueById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await EstoqueModel.findByPk(req.params.id);

  return res.json(user);
};

export const createEstoque = async (req: Request, res: Response) => {
  try {
    const { id_produto, quantidade } = req.body;

    if (!id_produto || !quantidade) {
      return res.status(400).json({ error: "Values required" });
    }

    const estoque = await EstoqueModel.create({ id_produto, quantidade });
    res.status(201).json(estoque);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const updateEstoque = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id_produto, quantidade } = req.body;
    const loggedEstoqueModel = req.body.user;
    console.log("logged", loggedEstoqueModel);

    if (!id_produto || !quantidade) {
      return res.status(400).json({ error: "Values required" });
    }

    const estoque = await EstoqueModel.findByPk(req.params.id);
    if (!estoque) {
      return res.status(404).json({ error: "User not found" });
    }

    estoque.id_produto = id_produto;
    estoque.quantidade = quantidade;

    await estoque.save();
    res.status(201).json(estoque);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyEstoqueById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const estoque = await EstoqueModel.findByPk(req.params.id);
    if (!estoque) {
      return res.status(404).json({ error: "User not found" });
    }

    await estoque.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
