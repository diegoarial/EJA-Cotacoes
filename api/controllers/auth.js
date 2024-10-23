import jwt from "jsonwebtoken";
import { db } from "../db.js";

// Função de login
export const login = (req, res) => {
  const { usuario, senha } = req.body;

  // Verifica se o usuário ou email existe
  const query = `SELECT * FROM administrador WHERE (usuario = ? OR email = ?) AND status = 'ativo'`;
  db.query(query, [usuario, usuario], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const administrador = results[0];

    // Verifica se a senha corresponde à do banco de dados
    if (senha !== administrador.senha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: administrador.idAdm },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Retorna o token e os dados do administrador
    res.json({ token, administrador });
  });
};
