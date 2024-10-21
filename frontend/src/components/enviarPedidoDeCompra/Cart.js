import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "../../styles/global.js";
import LayoutCart from "./LayoutCart.js";
import LayoutBase from "./LayoutBase.js";
import GridCart from "./GridCart.js";
import RemoveCart from "./RemoveCart.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Estilização da página
const Container = styled.div`
  width: 100%;
  max-width: 50rem;
  margin: 1.25rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  padding: 0 1.25rem;
`;

const Button = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
`;

const TopRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  top: 5.125rem;
  right: 1.25rem;
  margin-top: 0.625rem;
`;

const Cart = () => {
  const [produtos, setProdutos] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    const fetchCarrinho = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/carrinho/produtos/"
        );
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos do carrinho:", error);
      }
    };

    fetchCarrinho();
  }, []);

  const handleLimparCarrinho = async () => {
    try {
      const response = await axios.delete("http://localhost:8800/carrinho/");
      if (response.status === 200) {
        toast.success("Carrinho esvaziado!", { position: "bottom-left" });
        setProdutos([]);
      } else {
        toast.error("Erro ao esvaziar o carrinho.", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error("Erro ao esvaziar o carrinho:", error);
      toast.error("Erro ao esvaziar o carrinho.", { position: "bottom-left" });
    }
  };

  const openDeletePopup = () => {
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };

  const confirmDeleteCart = () => {
    handleLimparCarrinho();
    closeDeletePopup();
  };

  return (
    <>
      <LayoutCart />
      <Container>
        <TopRightContainer>
          <Button onClick={openDeletePopup}>Limpar Carrinho</Button>
        </TopRightContainer>
        <GridCart produtos={produtos} setProdutos={setProdutos} />
      </Container>
      <LayoutBase produtos={produtos} />
      <GlobalStyle />
      <ToastContainer position="bottom-left" />
      {isDeletePopupOpen && (
        <RemoveCart
          isOpen={isDeletePopupOpen}
          onClose={closeDeletePopup}
          onConfirm={confirmDeleteCart}
          message="Deseja realmente remover todos os produtos do carrinho? Esta alteração não poderá ser desfeita."
        />
      )}
    </>
  );
};

export default Cart;
