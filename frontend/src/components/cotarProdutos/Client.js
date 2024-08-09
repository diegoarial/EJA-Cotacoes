import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "../../styles/global.js";
import LayoutCli from "./LayoutCli";
import SearchCli from "./SearchCli";
import GridCli from "./GridCli";
import axios from "axios";

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

// Contêiner para alinhar o botão no canto superior direito
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

function Client() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [searchField, setSearchField] = useState("título");

  // Função para buscar os produtos do backend
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:8800");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  // Função para filtrar os produtos com base no searchTerm
  useEffect(() => {
    const filterProdutos = () => {
      if (searchTerm === "") {
        setFilteredProdutos(produtos);
      } else {
        const filtered = produtos.filter((produto) =>
          produto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProdutos(filtered);
      }
    };

    filterProdutos();
  }, [searchTerm, produtos]);

  return (
    <>
      <LayoutCli />
      <Container>
        <SearchCli
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchField={searchField}
          setSearchField={setSearchField}
        />
        <TopRightContainer>
          <Button>
            Adicionar ao Carrinho
          </Button>
        </TopRightContainer>
        <GridCli
          produtos={filteredProdutos}
          setProdutos={setProdutos}
        />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default Client;
