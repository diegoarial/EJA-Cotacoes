import { db } from "../db.js";
import nodemailer from "nodemailer";

export const salvarCliente = (req, res) => {
  // Query para verificar se o CPF já existe
  const checkCPFQuery = "SELECT * FROM cliente WHERE cpf = ?";
  const cpf = req.body.cpf;

  db.query(checkCPFQuery, [cpf], (err, data) => {
    if (err) {
      console.error("Erro ao verificar CPF:", err);
      return res.status(500).json("Erro ao acessar o banco de dados.");
    }

    // Caso o CPF já exista, retorna os dados do cliente
    if (data.length > 0) {
      console.log("Cliente já cadastrado, retornando informações...");
      return res.status(200).json({
        message: "Cliente já cadastrado.",
        cliente: data[0], // Dados do cliente
      });
    }

    // Caso contrário, insere um novo cliente
    const insertQuery =
      "INSERT INTO cliente (`cpf`, `nome`, `sobrenome`, `telefone`, `email`, `empresa`) VALUES(?)";

    const values = [
      req.body.cpf,
      req.body.nome,
      req.body.sobrenome,
      req.body.telefone,
      req.body.email,
      req.body.empresa,
    ];

    db.query(insertQuery, [values], (err) => {
      if (err) {
        console.error("Erro ao salvar cliente:", err);
        return res.status(500).json("Erro ao salvar cliente no banco de dados.");
      }

      return res.status(201).json("Cliente cadastrado com sucesso.");
    });
  });
};

// Método para buscar cliente por CPF
export const getClienteByCPF = (req, res) => {
  const cpf = req.body.cpf;  // Obtém o CPF enviado no corpo da requisição
  console.log("CPF recebido no backend:", cpf);

  const q = "SELECT * FROM cliente WHERE cpf = ?";

  db.query(q, [cpf], (err, data) => {
    if (err) {
      console.error("Erro ao buscar cliente:", err);
      return res.status(500).json(err);  // Caso haja erro ao acessar o banco de dados
    }

    console.log("Resultado da consulta:", data);
    if (data.length === 0) {
      return res.status(404).json("Cliente não encontrado.");  // Caso não encontre o cliente
    }

    // Se encontrar o cliente, retorna os dados completos
    return res.status(200).json(data[0]);
  });
};


const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
    user: 'diegopreisslerarial@gmail.com',
    pass: 'vwiqpcxjjgxmgwsx',
  },
});

export const enviarPedido = (req, res) => {
  const pdfBuffer = req.file.buffer;

  transport.sendMail({
    from: 'Pedido de Compra <diegopreisslerarial@gmail.com>',
    to: 'diegopreisslerarial@gmail.com',
    subject: 'Pedido de Compra',
    text: 'Segue em anexo o pedido de compra.',
    attachments: [
      {
        filename: 'pedido_de_compra.pdf',
        content: pdfBuffer,
      },
    ],
  })
  .then(() => {
    console.log('Email enviado com sucesso!');
    res.status(200).json({ message: 'Email enviado com sucesso!' });
  })
  .catch((err) => {
    console.log('Erro ao enviar email: ', err);
    res.status(500).json({ message: 'Erro ao enviar email', error: err });
  });
};
