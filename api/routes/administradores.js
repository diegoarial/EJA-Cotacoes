import express from "express";
import {
  getAdms,
  cadastrarAdministrador,
  editarAdministrador,
  removerAdministrador,
} from "../controllers/administrador.js";

const administradorRoutes = express.Router();

administradorRoutes.get("/", getAdms);

administradorRoutes.post("/", cadastrarAdministrador);

administradorRoutes.put("/:idAdm", editarAdministrador);

administradorRoutes.put("/:idAdm/inactivate", removerAdministrador);

export default administradorRoutes;
