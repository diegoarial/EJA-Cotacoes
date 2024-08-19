import express from "express";
import {
  adicionarAoCarrinho,
  buscarProdutosDoCarrinho,
  gerarCotacao,
} from "../controllers/carrinho.js";

const carrinhoRoutes = express.Router();

carrinhoRoutes.post("/carrinho", adicionarAoCarrinho);
carrinhoRoutes.get("/carrinho/produtos", buscarProdutosDoCarrinho);
carrinhoRoutes.get("/carrinho/cotacao", gerarCotacao);

export default carrinhoRoutes;
