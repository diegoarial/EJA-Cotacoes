import React, { useState } from "react";
import styled from "styled-components";
import { FaFilter, FaSearch } from "react-icons/fa";

// Estilização da caixa de fundo do pesquisar
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 2;
`;

const InputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

// Estilização da barra de pesquisa
const Input = styled.input`
  width: 93%;
  padding: 12px 40px 12px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:focus {
    border-color: #2c73d2;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

// Estilização do icon de pesquisar
const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
`;

// Estilização do botão de filtrar
const StyledFilterButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 9px 9px;
  border-radius: 50%;
  margin-left: 8px;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

// Estilização dos botões de opções de filtragem
const StyledOptionButton = styled.button`
  background-color: #2c73d2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 8px 0;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

// Estilização dos campos de dentro do popup de filtragem
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Estilização do popup de filtragem
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 300px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Função de pesquisa e filtragem
const Search = ({ searchTerm, setSearchTerm, searchField, setSearchField }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterSelection = (filterType) => {
    setSearchField(filterType);
    setShowFilters(false);
  };

  // Organização da barra de pesquisa e filtragem
  return (
    <SearchWrapper>
      <InputWrapper>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Pesquisar por ${searchField}`}
        />
        <SearchIcon />
      </InputWrapper>
      <StyledFilterButton onClick={toggleFilters}>
        <FaFilter style={{ position: "relative", top: "2px" }} />
      </StyledFilterButton>
      {showFilters && (
        <>
          <Overlay onClick={toggleFilters} />
          <ModalContent>
            <StyledOptionButton onClick={() => handleFilterSelection("geral")}>
              Geral
            </StyledOptionButton>
            <StyledOptionButton onClick={() => handleFilterSelection("título")}>
              Título
            </StyledOptionButton>
            <StyledOptionButton onClick={() => handleFilterSelection("SKU")}>
              SKU
            </StyledOptionButton>
          </ModalContent>
        </>
      )}
    </SearchWrapper>
  );
};

export default Search;
