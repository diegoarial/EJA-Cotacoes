import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtos.js";
import carrinhoRoutes from "./routes/carrinho.js";
import clienteRoutes from "./routes/clientes.js";
import administradorRoutes from "./routes/administradores.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import authMiddleware from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Definição das rotas
app.use("/produto", produtoRoutes);
app.use("/carrinho", carrinhoRoutes);
app.use("/cliente", clienteRoutes);
app.use("/administrador", authMiddleware, administradorRoutes);
app.use("/auth", authRoutes);

app.listen(8800, () => {
  console.log("Servidor rodando na porta 8800");
});
