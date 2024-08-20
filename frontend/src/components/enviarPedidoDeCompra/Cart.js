import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "../../styles/global.js";
import LayoutCart from "./LayoutCart.js";
import LayoutBase from "./LayoutBase.js";
import GridCart from "./GridCart.js";
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

// Função para buscar os produtos no carrinho
const Cart = () => {
  const [produtos, setProdutos] = useState([]);

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

  // Função para remover todos os produtos do carrinho
  const handleRemoverTudo = async () => {
    try {
      const response = await axios.delete("http://localhost:8800/carrinho/remover");

      if (response.status === 200) {
        toast.success("Carrinho esvaziado!", {
          position: "bottom-left",
        });
        setProdutos([]);
      } else {
        toast.error("Erro ao esvaziar o carrinho.", {
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error("Erro ao esvaziar o carrinho:", error);
      toast.error("Erro ao esvaziar o carrinho.", {
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <LayoutCart />
      <Container>
        <TopRightContainer>
          <Button onClick={handleRemoverTudo}>Remover Tudo</Button>
        </TopRightContainer>
        <GridCart produtos={produtos} setProdutos={setProdutos} />
      </Container>
      <LayoutBase />
      <GlobalStyle />
      <ToastContainer position="bottom-left" />
    </>
  );
};

export default Cart;
