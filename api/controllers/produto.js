import { db } from "../db.js";
import jwt from "jsonwebtoken";


export const getProdutos = (_, res) => {
  const q = "SELECT * FROM produto WHERE status = 'ativo'";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

//função de cadastrar um novo produto
export const cadastrarProduto = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json("Acesso não autorizado. Token não fornecido.");
  }

  let idAdm;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    idAdm = decoded.id; 
  } catch (err) {
    return res.status(403).json("Token inválido ou expirado.");
  }

  const query =
    "INSERT INTO produto (`titulo`, `precoVenda`, `precoCusto`, `peso`, `altura`, `largura`, `profundidade`, `idAdm`) VALUES(?)";

  const values = [
    req.body.titulo,
    req.body.precoVenda,
    req.body.precoCusto,
    req.body.peso,
    req.body.altura,
    req.body.largura,
    req.body.profundidade,
    idAdm,
  ];

  db.query(query, [values], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Erro ao cadastrar o produto.");
    }

    res.status(200).json("Produto cadastrado com sucesso.");
  });
};

//função de editar dados de um produto
export const editarProduto = (req, res) => {
  const q =
    "UPDATE produto SET `titulo` = ?, `precoVenda` = ?, `precoCusto` = ?, `peso` = ?, `altura` = ?, `largura` = ?, `profundidade` = ? WHERE `idProduto` = ?";

  const values = [
    req.body.titulo,
    req.body.precoVenda,
    req.body.precoCusto,
    req.body.peso,
    req.body.altura,
    req.body.largura,
    req.body.profundidade,
  ];

  db.query(q, [...values, req.params.idProduto], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

//função de inativar um produto para o cliente
export const removerProduto = (req, res) => {
  const q = "UPDATE produto SET status = 'inativo' WHERE idProduto = ?";

  db.query(q, [req.params.idProduto], (err) => {
    if (err) {
      console.error("Erro ao atualizar status do cliente: ", err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Produto removido com sucesso.");
  });
};
