import express from "express";
import {
  getProdutos,
  cadastrarProduto,
  editarProduto,
  removerProduto,
} from "../controllers/produto.js";

const produtoRoutes = express.Router();

produtoRoutes.get("/", getProdutos);

produtoRoutes.post("/", cadastrarProduto);

produtoRoutes.put("/:idProduto", editarProduto);

produtoRoutes.put("/:idProduto/inactivate", removerProduto);

export default produtoRoutes;
