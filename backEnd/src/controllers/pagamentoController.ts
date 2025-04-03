import { Request, Response } from "express";
import { PagamentoModel } from "../model/pagamentoModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const pagamentos = await PagamentoModel.findAll();
    res.json(pagamentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamentos" });
  }
};

export const createPagamento = async (req: Request, res: Response) => {
  try {
    const { forma_pagamento } = req.body;

    if (!forma_pagamento === undefined) {
      return res
        .status(400)
        .json({ error: "Valores obrigatórios não fornecidos" });
    }

    const pagamento = await PagamentoModel.create({ forma_pagamento });
    res.status(201).json(pagamento);
  } catch (error) {
    const errorMessage = (error as Error).message || "Erro interno no servidor";
    res.status(500).json({ error: errorMessage });
  }
};

export const getPagamentoById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const pagamento = await PagamentoModel.findByPk(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }
    res.json(pagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o pagamento" });
  }
};

export const updatePagamento = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { forma_pagamento } = req.body;
    const loggedPagamentoModel = req.body.user;
    console.log("logged", loggedPagamentoModel);

    if (!forma_pagamento) {
      return res.status(400).json({ error: "Values required" });
    }

    const pagamento = await PagamentoModel.findByPk(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ error: "User not found" });
    }

    pagamento.forma_pagamento = forma_pagamento;
    pagamento.updatedBy = loggedPagamentoModel.pagamento.id;

    await pagamento.save();
    res.json(pagamento);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const destroyPagamentoById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const pagamento = await PagamentoModel.findByPk(req.params.id);
    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado" });
    }

    await pagamento.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
