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
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const TopRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  top: 82px;
  right: 20px;
  margin-top: 10px;
`;

const Cart = () => {
  const [produtos, setProdutos] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    const fetchCarrinho = async () => {
      try {
        const response = await axios.get("http://localhost:8800/carrinho/produtos/");
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
        toast.error("Erro ao esvaziar o carrinho.", { position: "bottom-left" });
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
