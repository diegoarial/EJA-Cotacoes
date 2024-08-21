import express from "express";
import {
  adicionarProduto,
  buscarProdutosDoCarrinho,
  gerarCotacao,
  removerProduto,
  limparCarrinho,
} from "../controllers/carrinho.js";

const carrinhoRoutes = express.Router();

carrinhoRoutes.post("/", adicionarProduto);
carrinhoRoutes.get("/produtos", buscarProdutosDoCarrinho);
carrinhoRoutes.get("/cotacao", gerarCotacao);
carrinhoRoutes.delete("/remover", removerProduto);
carrinhoRoutes.delete("/", limparCarrinho);

export default carrinhoRoutes;
