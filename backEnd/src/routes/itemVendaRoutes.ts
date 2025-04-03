import express from "express";
import {
  getAll,
  getItemVendaById,
  createItemVenda,
  updateItemVenda,
  destroyItemVendaById,
} from "../controllers/itemVendaController";

const router = express.Router();

router.post("/itemVenda", createItemVenda);

router.get("/itemVenda", getAll);
router.get("/itemVenda/:id", getItemVendaById);
router.put("/itemVenda/:id", updateItemVenda);
router.delete("/itemVenda/:id", destroyItemVendaById);

export default router;
