import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

// Estilização da caixa de fundo do pesquisar
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  background-color: #f9f9f9;
  padding: 0.625rem;
  border-radius: 0.3125rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 2;
`;

const InputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;

const Input = styled.input`
  width: 93%;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:focus {
    border-color: #2c73d2;
    box-shadow: 0 0 0 0.125rem rgba(0, 123, 255, 0.25);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
`;

// Função de pesquisa
const SearchCli = ({ searchTerm, setSearchTerm, searchField }) => {
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
