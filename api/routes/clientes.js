import express from "express";
import { salvarCliente } from "../controllers/cliente.js";

const clienteRoutes = express.Router();

clienteRoutes.post("/", salvarCliente);

export default clienteRoutes;

