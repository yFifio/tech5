import { Request, Response } from "express";
import { itemVendaModel } from "../model/itemVendaRoutes";

export const getAll = async (req: Request, res: Response) => {
  const itemVenda = await itemVendaModel.findAll();
  res.send(itemVenda);
};

export const getItemVendaById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await itemVendaModel.findByPk(req.params.id);

  return res.json(user);
};

export const createItemVenda = async (req: Request, res: Response) => {
  try {
    const { id_venda, id_produto, quantidade, preco } = req.body;

    if (!id_venda || !id_produto || !quantidade || !preco) {
      return res.status(400).json({ error: "Values required" });
    }

    const itemVenda = await itemVendaModel.create({
      id_venda,
      id_produto,
      quantidade,
      preco,
    });
    res.status(201).json(itemVenda);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const updateItemVenda = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id_venda, id_produto, quantidade, preco } = req.body;
    const loggeditemVendaModel = req.body.user;
    console.log("logged", loggeditemVendaModel);

    if (!id_venda || !id_produto || !quantidade || !preco) {
      return res.status(400).json({ error: "Values required" });
    }

    const itemVenda = await itemVendaModel.findByPk(req.params.id);
    if (!itemVenda) {
      return res.status(404).json({ error: "User not found" });
    }

    itemVenda.id_venda = id_venda;
    itemVenda.id_produto = id_produto;
    (itemVenda.quantidade = quantidade), (itemVenda.preco = preco);
    itemVenda.updatedBy = loggeditemVendaModel.itemVenda.id;

    await itemVenda.save();
    res.status(201).json(itemVenda);
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};

export const destroyItemVendaById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const itemVenda = await itemVendaModel.findByPk(req.params.id);
    if (!itemVenda) {
      return res.status(404).json({ error: "User not found" });
    }

    await itemVenda.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json("Erro interno no servidor " + error);
  }
};
