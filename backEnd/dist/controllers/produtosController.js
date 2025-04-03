"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduto = exports.updateProduto = exports.createProduto = exports.getProdutoById = exports.getAllProdutos = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllProdutos = async (req, res) => {
    try {
        const [produtos] = await db_1.default.query("SELECT * FROM produtos");
        res.json(produtos);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllProdutos = getAllProdutos;
const getProdutoById = async (req, res) => {
    try {
        const [produto] = await db_1.default.query("SELECT * FROM produtos WHERE id_produto = ?", [req.params.id]);
        if (Array.isArray(produto)) {
            if (produto.length === 0) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }
            res.json(produto[0]);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getProdutoById = getProdutoById;
const createProduto = async (req, res) => {
    const { nome, descricao, preco } = req.body;
    try {
        const [result] = (await db_1.default.query("INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)", [nome, descricao, preco]));
        res.status(201).json({ id: result.insertId, nome, descricao, preco });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createProduto = createProduto;
const updateProduto = async (req, res) => {
    const { nome, descricao, preco } = req.body;
    try {
        await db_1.default.query("UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id_produto = ?", [nome, descricao, preco, req.params.id]);
        res.json({ id: req.params.id, nome, descricao, preco });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProduto = updateProduto;
const deleteProduto = async (req, res) => {
    try {
        await db_1.default.query("DELETE FROM produtos WHERE id_produto = ?", [
            req.params.id,
        ]);
        res.json({ message: "Produto deletado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteProduto = deleteProduto;
