import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

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

// Função de pesquisa
const SearchCli = ({ searchTerm, setSearchTerm, searchField }) => {

  // Organização da barra de pesquisa
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
    </SearchWrapper>
  );
};

export default SearchCli;
