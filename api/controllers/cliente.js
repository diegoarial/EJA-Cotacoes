import { db } from "../db.js";
import nodemailer from "nodemailer";

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

// Método para buscar cliente por CPF
export const getClienteByCPF = (req, res) => {
  const q = "SELECT * FROM cliente WHERE cpf = ?";
  const cpf = req.params.cpf;

  db.query(q, [cpf], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Cliente não encontrado.");

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
