import express from "express";
import {
  getAll,
  getVendaById,
  createVenda,
  updateVenda,
  destroyVendaById,
} from "../controllers/vendaController";

const router = express.Router();

router.post("/venda", createVenda);

router.get("/venda", getAll);
router.get("/venda/:id", getVendaById);
router.put("/venda/:id", updateVenda);
router.delete("/venda/:id", destroyVendaById);

export default router;
