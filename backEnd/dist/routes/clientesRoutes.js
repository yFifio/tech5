"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asyncHandler_1 = require("../utils/asyncHandler");
const clientesController_1 = require("../controllers/clientesController");
const router = (0, express_1.Router)();
// Rotas com tratamento assíncrono adequado
router.get("/", (0, asyncHandler_1.asyncHandler)(clientesController_1.getAllClientes));
router.get("/:id", (0, asyncHandler_1.asyncHandler)(clientesController_1.getClienteById));
router.post("/", (0, asyncHandler_1.asyncHandler)(clientesController_1.createCliente));
router.put("/:id", (0, asyncHandler_1.asyncHandler)(clientesController_1.updateCliente));
router.delete("/:id", (0, asyncHandler_1.asyncHandler)(clientesController_1.deleteCliente));
exports.default = router;
