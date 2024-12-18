import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../../styles/global.js";
import FormAdm from "./FormAdm.js";
import GridAdm from "./GridAdm.js";
import SearchAdm from "./SearchAdm.js";
import LayoutAdm from "./LayoutAdm.js";

// Estilização da página
const Container = styled.div`
  width: 100%;
  max-width: 50rem;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

function AdmApp() {
  const [adms, setAdms] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("geral");

  //Função de filtragem
  const filterAdms = (adms, field, term) => {
    // eslint-disable-next-line default-case
    switch (field) {
      case "geral":
        return adms.filter(
          (adm) =>
            (adm.nome + " " + adm.sobrenome)
              .toLowerCase()
              .includes(term.toLowerCase()) ||
            adm.usuario.toLowerCase().includes(term.toLowerCase())
        );
      case "nome":
        return adms.filter((adm) =>
          (adm.nome + " " + adm.sobrenome)
            .toLowerCase()
            .includes(term.toLowerCase())
        );
      case "usuario":
        return adms.filter((adm) =>
          adm.usuario.toLowerCase().includes(term.toLowerCase())
        );
    }
  };

  // Deixar em ordem alfabética
  const getFilteredAdms = async (term) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8800/administrador/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filtered = filterAdms(res.data, searchField, searchTerm);
      setAdms(filtered.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Sessão expirada. Faça login novamente.");
        window.location.href = "/Login";
      } else {
        toast.error(
          error.response?.data?.message || "Erro ao carregar administradores"
        );
      }
    }
  };

  useEffect(() => {
    getFilteredAdms(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchField]);

  // Organização da página
  return (
    <>
      <LayoutAdm />
      <Container>
        <SearchAdm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchField={searchField}
          setSearchField={setSearchField}
        />
        <FormAdm
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getAdms={getFilteredAdms}
        />
        <GridAdm adms={adms} setAdms={setAdms} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default AdmApp;
