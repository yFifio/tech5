"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePagamento = exports.updatePagamento = exports.createPagamento = exports.getPagamentoById = exports.getAllPagamentos = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllPagamentos = async (req, res) => {
    try {
        const [pagamentos] = await db_1.default.query("SELECT * FROM formas_pagamento");
        res.json(pagamentos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllPagamentos = getAllPagamentos;
const getPagamentoById = async (req, res) => {
    try {
        const [pagamento] = await db_1.default.query("SELECT * FROM formas_pagamento WHERE id_pagamento = ?", [req.params.id]);
        if (Array.isArray(pagamento)) {
            if (pagamento.length === 0) {
                return res
                    .status(404)
                    .json({ message: "Forma de pagamento não encontrada" });
            }
            res.json(pagamento[0]);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPagamentoById = getPagamentoById;
const createPagamento = async (req, res) => {
    const { forma_pagamento } = req.body;
    try {
        const [result] = (await db_1.default.query("INSERT INTO formas_pagamento (forma_pagamento) VALUES (?)", [forma_pagamento]));
        res.status(201).json({ id: result.insertId, forma_pagamento });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createPagamento = createPagamento;
const updatePagamento = async (req, res) => {
    const { forma_pagamento } = req.body;
    try {
        await db_1.default.query("UPDATE formas_pagamento SET forma_pagamento = ? WHERE id_pagamento = ?", [forma_pagamento, req.params.id]);
        res.json({ id: req.params.id, forma_pagamento });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updatePagamento = updatePagamento;
const deletePagamento = async (req, res) => {
    try {
        await db_1.default.query("DELETE FROM formas_pagamento WHERE id_pagamento = ?", [
            req.params.id,
        ]);
        res.json({ message: "Forma de pagamento deletada com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deletePagamento = deletePagamento;
