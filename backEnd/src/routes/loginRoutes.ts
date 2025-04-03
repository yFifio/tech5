import express from "express";
import { loginCliente } from "../controllers/loginController";

const router = express.Router();

router.post("/login", loginCliente);

export default router;
