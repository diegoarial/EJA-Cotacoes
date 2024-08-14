import express from "express";
import userRoutes from "./routes/produtos.js";
import cors from "cors";
import carrinhoRoutes from "./routes/carrinho.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", carrinhoRoutes);

app.listen(8800);
