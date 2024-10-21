import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "../../styles/global.js";
import LayoutCli from "./LayoutCli";
import SearchCli from "./SearchCli";
import GridCli from "./GridCli";
import axios from "axios";
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

function Client() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [searchField, setSearchField] = useState("título");
  const [values, setValues] = useState({});

  // Função para buscar os produtos do backend
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:8800/produto/");
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
        <GridCli
          produtos={filteredProdutos}
          setProdutos={setProdutos}
          values={values}
          setValues={setValues}
        />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default Client;
