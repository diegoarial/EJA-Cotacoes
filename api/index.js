import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtos.js";
import carrinhoRoutes from "./routes/carrinho.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/produto", produtoRoutes);
app.use("/carrinho", carrinhoRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
