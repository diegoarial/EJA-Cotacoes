import express from "express";
import {
  getProdutos,
  cadastrarProduto,
  editarProduto,
  removerProduto,
} from "../controllers/produto.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const produtoRoutes = express.Router();

produtoRoutes.get("/", getProdutos);

produtoRoutes.use(authMiddleware);

produtoRoutes.post("/", cadastrarProduto);

produtoRoutes.put("/:idProduto", editarProduto);

produtoRoutes.put("/:idProduto/inactivate", removerProduto);

export default produtoRoutes;
