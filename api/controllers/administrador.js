import { db } from "../db.js";

export const getAdms = (_, res) => {
  const q = "SELECT * FROM administrador WHERE status = 'ativo'";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//função de cadastrar um novo administrador
export const cadastrarAdministrador = (req, res) => {
  const q =
    "INSERT INTO administrador (`usuario`, `email`, `senha`, `nome`, `sobrenome`, `telefone`) VALUES(?)";

  const values = [
    req.body.usuario,
    req.body.email,
    req.body.senha,
    req.body.nome,
    req.body.sobrenome,
    req.body.telefone,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Administrador cadastrado com sucesso.");
  });
};

//função de editar dados de um administrador
export const editarAdministrador = (req, res) => {
  const q =
    "UPDATE administrador SET `usuario` = ?, `email` = ?, `senha` = ?, `nome` = ?, `sobrenome` = ?, `telefone` = ? WHERE `idAdm` = ?";

  const values = [
    req.body.usuario,
    req.body.email,
    req.body.senha,
    req.body.nome,
    req.body.sobrenome,
    req.body.telefone,
  ];

  db.query(q, [...values, req.params.idAdm], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Administrador atualizado com sucesso.");
  });
};

//função de inativar um administrador no sistema
export const removerAdministrador = (req, res) => {
  const q = "UPDATE administrador SET status = 'inativo' WHERE idAdm = ?";

  db.query(q, [req.params.idAdm], (err) => {
    if (err) {
      console.error("Erro ao atualizar status do administrador: ", err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Administrador removido com sucesso.");
  });
};
