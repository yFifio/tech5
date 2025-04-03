import express from "express";
import {
  getAll,
  getEstoqueById,
  createEstoque,
  updateEstoque,
  destroyEstoqueById,
} from "../controllers/estoqueController";

const router = express.Router();

router.post("/estoque", createEstoque);

router.get("/estoque", getAll);
router.get("/estoque/:id", getEstoqueById);
router.put("/estoque/:id", updateEstoque);
router.delete("/estoque/:id", destroyEstoqueById);

export default router;
