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


function Client() {
  const [produtos, setProdutos] = useState([]);
  const [setOnEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
          produtos={produtos}
          setProdutos={setProdutos}
          setOnEdit={setOnEdit}
        />
      </Container>
      <GlobalStyle />
    </>
  );
}

export default Client;
