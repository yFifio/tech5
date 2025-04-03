import { Request, Response } from "express";
import { VendaModel } from "../model/vendaModel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const vendas = await VendaModel.findAll();
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
};

export const createVenda = async (req: Request, res: Response) => {
  try {
    const {
      id_cliente,
      data_venda,
      valor_total,
      numero_cartao,
      validade,
      cvv,
      nome_completo,
      endereco,
      cidade,
      estado,
      cep,
    } = req.body;

    if (
      !id_cliente ||
      !data_venda ||
      !valor_total ||
      !numero_cartao ||
      !validade ||
      !cvv ||
      !nome_completo ||
      !endereco ||
      !cidade ||
      !estado ||
      !cep === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Valores obrigatórios não fornecidos" });
    }

    const venda = await VendaModel.create({
      id_cliente,
      data_venda,
      valor_total,
      numero_cartao,
      validade,
      cvv,
      nome_completo,
      endereco,
      cidade,
      estado,
      cep,
    });
    res.status(201).json(venda);
  } catch (error) {
    const errorMessage = (error as Error).message || "Erro interno no servidor";
    res.status(500).json({ error: errorMessage });
  }
};

export const getVendaById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const venda = await VendaModel.findByPk(req.params.id);
    if (!venda) {
      return res.status(404).json({ error: "Venda não encontrado" });
    }
    res.json(venda);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o venda" });
  }
};

export const updateVenda = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const {
      id_cliente,
      data_venda,
      valor_total,
      numero_cartao,
      validade,
      cvv,
      nome_completo,
      endereco,
      cidade,
      estado,
      cep,
    } = req.body;
    const loggedVendaModel = req.body.user;
    console.log("logged", loggedVendaModel);

    if (
      !id_cliente ||
      !data_venda ||
      !valor_total ||
      !numero_cartao ||
      !validade ||
      !cvv ||
      !nome_completo ||
      !endereco ||
      !cidade ||
      !estado ||
      cep === undefined
    ) {
      return res.status(400).json({ error: "Values required" });
    }

    const venda = await VendaModel.findByPk(req.params.id);
    if (!venda) {
      return res.status(404).json({ error: "User not found" });
    }

    venda.id_cliente = id_cliente;
    venda.data_venda = data_venda;
    venda.valor_total = valor_total;
    venda.numero_cartao = numero_cartao;
    venda.validade = validade;
    venda.cvv = cvv;
    venda.nome_completo = nome_completo;
    venda.endereco = endereco;
    venda.cidade = cidade;
    venda.cep = cep;
    venda.updatedBy = loggedVendaModel.venda.id;

    await venda.save();
    res.json(venda);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};

export const destroyVendaById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const venda = await VendaModel.findByPk(req.params.id);
    if (!venda) {
      return res.status(404).json({ error: "Venda não encontrado" });
    }

    await venda.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};
