import express from "express";
import {
  getAdms,
  cadastrarAdministrador,
  editarAdministrador,
  removerAdministrador,
} from "../controllers/administrador.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const administradorRoutes = express.Router();

administradorRoutes.use(authMiddleware);

administradorRoutes.get("/", getAdms);

administradorRoutes.post("/", cadastrarAdministrador);

administradorRoutes.put("/:idAdm", editarAdministrador);

administradorRoutes.put("/:idAdm/inactivate", removerAdministrador);

export default administradorRoutes;
