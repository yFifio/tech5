"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagamentosController_1 = require("../controllers/pagamentosController");
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    (0, pagamentosController_1.getAllPagamentos)(req, res).catch(next);
});
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.get("/:id", asyncHandler(pagamentosController_1.getPagamentoById));
router.post("/", asyncHandler(pagamentosController_1.createPagamento));
router.put("/:id", asyncHandler(pagamentosController_1.updatePagamento));
router.delete("/:id", asyncHandler(pagamentosController_1.deletePagamento));
exports.default = router;
