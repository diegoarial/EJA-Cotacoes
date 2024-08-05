import express from "express";
import {
  getProdutos,
  cadastrarProduto,
  editarProduto,
  removerProduto,
} from "../controllers/produto.js";

const router = express.Router();

router.get("/", getProdutos);

router.post("/", cadastrarProduto);

router.put("/:idProduto", editarProduto);

router.put("/:idProduto/inactivate", removerProduto);

export default router;


