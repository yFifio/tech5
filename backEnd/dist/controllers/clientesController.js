"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClienteById = exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getAllClientes = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllClientes = async (req, res) => {
    try {
        const [clientes] = await db_1.default.query("SELECT * FROM clientes");
        res.json(clientes);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar clientes" });
    }
};
exports.getAllClientes = getAllClientes;
const createCliente = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const [result] = (await db_1.default.query("INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)", [nome, email, senha]));
        res.status(201).json({ id: result.insertId, nome, email });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createCliente = createCliente;
const updateCliente = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        await db_1.default.query("UPDATE clientes SET nome = ?, email = ?, senha = ? WHERE id_cliente = ?", [nome, email, senha, req.params.id]);
        res.json({ id: req.params.id, nome, email });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateCliente = updateCliente;
const deleteCliente = async (req, res) => {
    try {
        await db_1.default.query("DELETE FROM clientes WHERE id_cliente = ?", [
            req.params.id,
        ]);
        res.json({ message: "Cliente deletado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteCliente = deleteCliente;
const getClienteById = async (req, res) => { };
exports.getClienteById = getClienteById;
