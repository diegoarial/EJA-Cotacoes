import { db } from "../db.js";

// Função para adicionar produtos ao carrinho
export const adicionarAoCarrinho = (req, res) => {
    const { idProduto, quantidade, precoVenda } = req.body;
    const precoTotal = quantidade * precoVenda;

    const q = "INSERT INTO carrinho (`idProduto`, `quantidade`, `precoTotal`) VALUES (?, ?, ?)";

    db.query(q, [idProduto, quantidade, precoTotal], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Produto adicionado ao carrinho com sucesso.");
    });
};
