import express from "express";
import {
  getAll,
  getPagamentoById,
  createPagamento,
  updatePagamento,
  destroyPagamentoById,
} from "../controllers/pagamentoController";

const router = express.Router();

router.post("/pagamento", createPagamento);

router.get("/pagamento", getAll);
router.get("/pagamento/:id", getPagamentoById);
router.put("/pagamento/:id", updatePagamento);
router.delete("/pagamento/:id", destroyPagamentoById);

export default router;
