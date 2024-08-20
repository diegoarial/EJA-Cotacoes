import express from "express";
import {
  adicionarProduto,
  buscarProdutosDoCarrinho,
  gerarCotacao,
  removerProduto,
} from "../controllers/carrinho.js";

const carrinhoRoutes = express.Router();

carrinhoRoutes.post("/", adicionarProduto);
carrinhoRoutes.get("/produtos", buscarProdutosDoCarrinho);
carrinhoRoutes.get("/cotacao", gerarCotacao);
carrinhoRoutes.delete("/remover", removerProduto);


export default carrinhoRoutes;
