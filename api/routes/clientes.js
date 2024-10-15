import express from "express";
import { salvarCliente, getClienteByCPF, enviarPedido } from "../controllers/cliente.js";
import multer from "multer";

const clienteRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

clienteRoutes.post("/", salvarCliente);
clienteRoutes.get("/:cpf", getClienteByCPF);
clienteRoutes.post("/enviarPedido", upload.single("pedidoPDF"), enviarPedido);

export default clienteRoutes;

