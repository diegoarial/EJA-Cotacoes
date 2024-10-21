import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import RemoveCart from "./RemoveCart";

// Estilização da tabela do Grid
const Table = styled.table`
  width: 100%;
  height: auto;
  width: 50rem;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.3125rem;
  margin: 1.25rem auto;
  word-break: break-all;
  text-align: center;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 0.3125rem;

  @media (max-width: 31.25rem) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 0.9375rem;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 31.25rem) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

const IconContainer = styled.div`
  overflow: visible;
`;

const DeleteIcon = styled(FaTrash)`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 0.125rem solid transparent;
  border-radius: 45%;
  transform-origin: top center;

  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

const GridCart = ({ produtos, setProdutos }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  const openRemovePopup = (product) => {
    setProductToRemove(product);
    setIsPopupOpen(true);
  };

  const closeRemovePopup = () => {
    setIsPopupOpen(false);
    setProductToRemove(null);
  };

  const handleRemoveProduct = async () => {
    try {
      await axios.delete("http://localhost:8800/carrinho/remover", {
        data: { idProdutoCarrinho: productToRemove.idProdutoCarrinho },
      });
      toast.success("Produto removido do carrinho!");

      setProdutos((prevProdutos) =>
        prevProdutos.filter(
          (item) => item.idProdutoCarrinho !== productToRemove.idProdutoCarrinho
        )
      );
    } catch (error) {
      console.error("Erro ao remover produto do carrinho:", error);
      toast.error("Erro ao remover produto do carrinho.");
    }
    closeRemovePopup();
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
                    <DeleteIcon onClick={() => openRemovePopup(item)} />
                  </IconContainer>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {isPopupOpen && (
        <RemoveCart
          isOpen={isPopupOpen}
          onClose={closeRemovePopup}
          onConfirm={handleRemoveProduct}
          message={`Deseja realmente remover o produto "${productToRemove?.titulo}" do carrinho? Esta alteração não poderá ser desfeita.`}
        />
      )}
    </>
  );
};

export default GridCart;
