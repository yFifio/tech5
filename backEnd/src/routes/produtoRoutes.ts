import express from "express";
import {
  getAll,
  getProdutoById,
  createProduto,
  updateProduto,
  destroyProdutoById,
} from "../controllers/produtosController";

const router = express.Router();

router.post("/produto", createProduto);

router.get("/produto", getAll);
router.get("/produto/:id", getProdutoById);
router.put("/produto/:id", updateProduto);
router.delete("/produto/:id", destroyProdutoById);

export default router;
