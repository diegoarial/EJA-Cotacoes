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

// Adicionar produtos ao carrinho
export const adicionarProduto = (req, res) => {
  const { idProduto, quantidade, precoVenda } = req.body;
  const precoTotal = quantidade * precoVenda;

  const checkProductQuery =
    "SELECT * FROM produto_carrinho WHERE idProduto = ?";
  db.query(checkProductQuery, [idProduto], (err, results) => {
    if (err) {
      console.error("Erro ao verificar o produto no carrinho:", err);
      return res.status(500).json(err);
    }

    if (results.length > 0) {
      const existingProduct = results[0];
      const newQuantidade = existingProduct.quantidade + quantidade;
      const newPrecoTotal = newQuantidade * precoVenda;

      const updateProductQuery =
        "UPDATE produto_carrinho SET quantidade = ?, precoTotal = ? WHERE idProduto = ?";
      db.query(
        updateProductQuery,
        [newQuantidade, newPrecoTotal, idProduto],
        (err) => {
          if (err) {
            console.error("Erro ao atualizar o produto no carrinho:", err);
            return res.status(500).json(err);
          }
          return res
            .status(200)
            .json("Produto atualizado no carrinho com sucesso.");
        }
      );
    } else {
      const insertProdutoCarrinhoQuery =
        "INSERT INTO produto_carrinho (idProduto, quantidade, precoTotal) VALUES (?, ?, ?)";
      db.query(
        insertProdutoCarrinhoQuery,
        [idProduto, quantidade, precoTotal],
        (err, result) => {
          if (err) {
            console.error("Erro ao adicionar produto ao carrinho:", err);
            return res.status(500).json(err);
          }

          const idProdutoCarrinho = result.insertId;
          const insertCarrinhoQuery =
            "INSERT INTO carrinho (idProdutoCarrinho) VALUES (?)";
          db.query(insertCarrinhoQuery, [idProdutoCarrinho], (err) => {
            if (err) {
              console.error("Erro ao associar produto ao carrinho:", err);
              return res.status(500).json(err);
            }
            return res
              .status(200)
              .json("Produto adicionado ao carrinho com sucesso.");
          });
        }
      );
    }
  });
};

// Remover produto do carrinho
export const removerProduto = (req, res) => {
  const { idProdutoCarrinho } = req.body;

  // Verificar se o produto está no carrinho
  const checkProductQuery =
    "SELECT * FROM carrinho WHERE idProdutoCarrinho = ?";
  db.query(checkProductQuery, [idProdutoCarrinho], (err, results) => {
    if (err) {
      console.error("Erro ao verificar o produto no carrinho:", err);
      return res
        .status(500)
        .json({ error: "Erro ao verificar o produto no carrinho." });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Produto não encontrado no carrinho." });
    }

    // Remover a entrada correspondente na tabela carrinho
    const deleteCarrinhoQuery =
      "DELETE FROM carrinho WHERE idProdutoCarrinho = ?";
    db.query(deleteCarrinhoQuery, [idProdutoCarrinho], (err) => {
      if (err) {
        console.error(
          "Erro ao remover a associação do produto com o carrinho:",
          err
        );
        return res
          .status(500)
          .json({
            error: "Erro ao remover a associação do produto com o carrinho.",
          });
      }

      // Remover o produto da tabela produto_carrinho
      const deleteProductQuery =
        "DELETE FROM produto_carrinho WHERE idProdutoCarrinho = ?";
      db.query(deleteProductQuery, [idProdutoCarrinho], (err) => {
        if (err) {
          console.error("Erro ao remover o produto do carrinho:", err);
          return res
            .status(500)
            .json({ error: "Erro ao remover o produto do carrinho." });
        }

        return res
          .status(200)
          .json("Produto removido do carrinho com sucesso.");
      });
    });
  });
};

// Limpar o carrinho
export const limparCarrinho = (req, res) => {
  const deleteCarrinhoQuery = "DELETE FROM carrinho";
  const deleteProdutoCarrinhoQuery = "DELETE FROM produto_carrinho";

  db.query(deleteCarrinhoQuery, (err) => {
    if (err) {
      console.error("Erro ao esvaziar o carrinho:", err);
      return res.status(500).json({ error: "Erro ao esvaziar o carrinho." });
    }

    db.query(deleteProdutoCarrinhoQuery, (err) => {
      if (err) {
        console.error("Erro ao remover os produtos do carrinho:", err);
        return res
          .status(500)
          .json({ error: "Erro ao remover os produtos do carrinho." });
      }

      return res.status(200).json("Carrinho esvaziado com sucesso.");
    });
  });
};

// Gerar Cotação
export const gerarCotacao = (req, res) => {
  const q = "SELECT SUM(precoTotal) AS cotacaoFinal FROM produto_carrinho";

  db.query(q, (err, data) => {
    if (err) {
      console.error("Erro ao calcular a cotação:", err);
      return res.status(500).json(err);
    }
    const cotacaoFinal = data[0].cotacaoFinal || 0;
    return res.status(200).json({ cotacaoFinal });
  });
};
