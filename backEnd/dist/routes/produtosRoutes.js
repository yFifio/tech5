"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler")); // Importe usando caminho correto
const produtosController_1 = require("../controllers/produtosController");
const router = (0, express_1.Router)();
router.get("/", (0, asyncHandler_1.default)(produtosController_1.getAllProdutos));
router.get("/:id", (0, asyncHandler_1.default)(produtosController_1.getProdutoById));
router.post("/", (0, asyncHandler_1.default)(produtosController_1.createProduto));
router.put("/:id", (0, asyncHandler_1.default)(produtosController_1.updateProduto));
router.delete("/:id", (0, asyncHandler_1.default)(produtosController_1.deleteProduto));
exports.default = router;
