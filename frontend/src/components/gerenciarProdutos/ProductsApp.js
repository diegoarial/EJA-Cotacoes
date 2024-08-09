import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../../styles/global.js";
import Form from "./Form.js";
import Grid from "./Grid.js";
import Search from "./Search.js";
import Layout from "./Layout.js";

// Estilização da página
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function ProductsApp() {
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("geral");

  //Função de filtragem
  const filterProducts = (products, field, term) => {
    switch (field) {
      case "geral":
        return products.filter(
          (product) =>
            product.titulo.toLowerCase().includes(term.toLowerCase()) ||
            String(product.idProduto).includes(term)
        );
      case "título":
        return products.filter((product) =>
          product.titulo.toLowerCase().includes(term.toLowerCase())
        );
      case "SKU":
        return products.filter((product) =>
          String(product.idProduto).includes(term)
        );
      default:
        return [];
    }
  };

  // Deixar em ordem alfabética
  const getFilteredProducts = async (term) => {
    try {
      const res = await axios.get("http://localhost:8800");
      const filtered = filterProducts(res.data, searchField, searchTerm);
      setProdutos(filtered.sort((a, b) => (a.titulo > b.titulo ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFilteredProducts(searchTerm);
  }, [searchTerm, searchField]);

  // Organização da página
  return (
    <>
      <Layout />
      <Container>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchField={searchField}
          setSearchField={setSearchField}
        />
        <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getProdutos={getFilteredProducts}
        />
        <Grid
          produtos={produtos}
          setProdutos={setProdutos}
          setOnEdit={setOnEdit}
        />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default ProductsApp;