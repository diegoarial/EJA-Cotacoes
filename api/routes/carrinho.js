import express from "express";
import { adicionarAoCarrinho } from "../controllers/carrinho.js";

const router = express.Router();

router.post("/carrinho", adicionarAoCarrinho);

export default router;