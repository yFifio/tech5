import express from "express";
import {
  getAll,
  getClienteById,
  createCliente,
  updateCliente,
  destroyClienteById,
} from "../controllers/clientesController";

const router = express.Router();

router.post("/cliente", createCliente);

router.get("/cliente", getAll);
router.get("/cliente/:id", getClienteById);
router.put("/cliente/:id", updateCliente);
router.delete("/cliente/:id", destroyClienteById);

export default router;
