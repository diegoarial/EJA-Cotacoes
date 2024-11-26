import jwt from "jsonwebtoken";
import { db } from "../db.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

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
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const administrador = results[0];

    // Verifica se a senha corresponde à do banco de dados
    if (senha !== administrador.senha) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: administrador.idAdm },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retorna o token e os dados do administrador
    res.json({ token, administrador });
  });
};

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para redefinição de senha
export const forgotPassword = (req, res) => {
  const { usuario, email } = req.body;

  // Verifica se o usuário e o e-mail existem no banco
  const query = `SELECT * FROM administrador WHERE usuario = ? AND email = ? AND status = 'ativo'`;
  db.query(query, [usuario, email], (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco:", err);
      return res.status(500).json({ message: "Erro no servidor." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário ou e-mail não encontrado." });
    }

    const token = crypto.randomBytes(20).toString("hex"); // Gera um token aleatório
    const expiration = Date.now() + 3600000; // Token válido por 1 hora

    // Salva o token no banco
    const updateQuery = `UPDATE administrador SET reset_token = ?, reset_token_expiration = ? WHERE idAdm = ?`;
    db.query(updateQuery, [token, expiration, results[0].idAdm], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao salvar token." });
      }

      // Envia o e-mail
      const resetLink = `http://localhost:3000/reset-password/${token}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Redefinição de Senha",
        text: `Olá, ${usuario}!\n\nClique no link abaixo para redefinir sua senha:\n\n${resetLink}\n\nO link é válido por 1 hora.`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao enviar e-mail." });
        }

        res.status(200).json({ success: true, message: "E-mail enviado com sucesso!" });
      });
    });
  });
};

// Rota para redefinir a senha
export const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;

  // Verifica o token e sua validade
  const query = `SELECT * FROM administrador WHERE reset_token = ? AND reset_token_expiration > ?`;
  db.query(query, [token, Date.now()], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no servidor." });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    // Atualiza a senha e remove o token
    const hashedPassword = newPassword; // Em produção, use um hash seguro como bcrypt
    const updateQuery = `UPDATE administrador SET senha = ?, reset_token = NULL, reset_token_expiration = NULL WHERE idAdm = ?`;
    db.query(updateQuery, [hashedPassword, results[0].idAdm], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao atualizar senha." });
      }

      res.status(200).json({ success: true, message: "Senha redefinida com sucesso!" });
    });
  });
};