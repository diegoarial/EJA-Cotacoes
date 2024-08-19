import { db } from "../db.js";

// Buscar produtos do carrinho
export const buscarProdutosDoCarrinho = (req, res) => {
  const q =
    "SELECT pc.idProdutoCarrinho, p.titulo, p.precoVenda, pc.quantidade, pc.precoTotal FROM carrinho c JOIN produto_carrinho pc ON c.idProdutoCarrinho = pc.idProdutoCarrinho JOIN produto p ON pc.idProduto = p.idProduto";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const adicionarAoCarrinho = (req, res) => {
  const { idProduto, quantidade, precoVenda } = req.body;
  const precoTotal = quantidade * precoVenda;

  // Primeiro, insere na tabela produto_carrinho
  const insertProdutoCarrinhoQuery = "INSERT INTO produto_carrinho (idProduto, quantidade, precoTotal) VALUES (?, ?, ?)";
  db.query(insertProdutoCarrinhoQuery, [idProduto, quantidade, precoTotal], (err, result) => {
    if (err) {
      console.error("Erro ao adicionar produto ao carrinho:", err);
      return res.status(500).json(err);
    }

    // Em seguida, insere na tabela carrinho usando o ID gerado da inserção anterior
    const idProdutoCarrinho = result.insertId; // Certifique-se de que isso está correto
    const insertCarrinhoQuery = "INSERT INTO carrinho (idProdutoCarrinho) VALUES (?)";
    db.query(insertCarrinhoQuery, [idProdutoCarrinho], (err) => {
      if (err) {
        console.error("Erro ao associar produto ao carrinho:", err);
        return res.status(500).json(err);
      }
      return res.status(200).json("Produto adicionado ao carrinho com sucesso.");
    });
  });
};


// Gerar Cotação
export const gerarCotacao = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT SUM(pc.precoTotal) AS total FROM produto_carrinho pc");
    const total = rows[0].total || 0;
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar cotação" });
  }
};
