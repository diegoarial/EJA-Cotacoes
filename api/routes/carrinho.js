import express from "express";
import {
  adicionarAoCarrinho,
  buscarProdutosDoCarrinho,
  gerarCotacao,
} from "../controllers/carrinho.js";

const carrinhoRoutes = express.Router();

carrinhoRoutes.post("/", adicionarAoCarrinho);
carrinhoRoutes.get("/produtos", buscarProdutosDoCarrinho);
carrinhoRoutes.get("/cotacao", gerarCotacao);

export default carrinhoRoutes;
