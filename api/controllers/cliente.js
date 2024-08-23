import { db } from "../db.js";

export const salvarCliente = (req, res) => {
    const q =
      "INSERT INTO cliente (`cpf`, `nome`, `sobrenome`, `telefone`, `email`, `empresa`) VALUES(?)";
  
    const values = [
      req.body.cpf,
      req.body.nome,
      req.body.sobrenome,
      req.body.telefone,
      req.body.email,
      req.body.empresa,
    ];
  
    db.query(q, [values], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Cliente cadastrado com sucesso.");
    });
  };
  