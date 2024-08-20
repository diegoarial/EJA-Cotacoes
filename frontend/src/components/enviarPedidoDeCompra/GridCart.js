import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

// Edição da tabela do Grid
const Table = styled.table`
  width: 100%;
  height: auto;
  width: 800px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;
  word-break: break-all;
  text-align: center;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

const IconContainer = styled.div`
  overflow: visible;
`;

const DeleteIcon = styled(FaTrash)`
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 2px solid transparent;
  border-radius: 45%;
  transform-origin: top center;

  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

const GridCart = ({ produtos, setProdutos }) => {
  // Função para remover produto
  const handleRemoveProduct = async (idProdutoCarrinho) => {
    try {
      await axios.delete("http://localhost:8800/carrinho/remover", {
        data: { idProdutoCarrinho }
      });
      toast.success("Produto removido do carrinho!");

      // Atualiza a lista de produtos
      setProdutos((prevProdutos) => prevProdutos.filter(item => item.idProdutoCarrinho !== idProdutoCarrinho));
    } catch (error) {
      console.error("Erro ao remover produto do carrinho:", error);
      toast.error("Erro ao remover produto do carrinho.");
    }
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Preço (1 un.)</Th>
            <Th>Quantidade</Th>
            <Th>Preço Total</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {produtos.length === 0 ? (
            <Tr>
              <Td colSpan="5" style={{ textAlign: "center" }}>
                Nenhum produto encontrado
              </Td>
            </Tr>
          ) : (
            produtos.map((item, i) => (
              <Tr key={i}>
                <Td width="40%">{item.titulo}</Td>
                <Td width="20%">{item.precoVenda}</Td>
                <Td width="15%">{item.quantidade}</Td>
                <Td width="20%">{item.precoTotal}</Td>
                <Td style={{ textAlign: "center" }} width="5%">
                  <IconContainer>
                    <DeleteIcon onClick={() => handleRemoveProduct(item.idProdutoCarrinho)} />
                  </IconContainer>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </>
  );
};

export default GridCart;
