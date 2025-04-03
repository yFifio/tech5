import { Request, Response } from "express";
import { ProdutoModel } from "../model/produtoModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const produtos = await ProdutoModel.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

export const createProduto = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, preco } = req.body;

    if (!nome || !descricao || preco === undefined) {
      return res
        .status(400)
        .json({ error: "Valores obrigatórios não fornecidos" });
    }

    const produto = await ProdutoModel.create({ nome, descricao, preco });
    res.status(201).json(produto);
  } catch (error) {
    const errorMessage = (error as Error).message || "Erro interno no servidor";
    res.status(500).json({ error: errorMessage });
  }
};

export const getProdutoById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const produto = await ProdutoModel.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o produto" });
  }
};

export const updateProduto = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { nome, descricao, preco } = req.body;
    const loggedProdutoModel = req.body.user;
    console.log("logged", loggedProdutoModel);

    if (!nome || !descricao || !preco) {
      return res.status(400).json({ error: "Values required" });
    }

    const produto = await ProdutoModel.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: "User not found" });
    }

    produto.nome = nome;
    produto.descricao = descricao;
    produto.preco = preco;
    produto.updatedBy = loggedProdutoModel.produto.id;

    await produto.save();
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const destroyProdutoById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const produto = await ProdutoModel.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await produto.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
