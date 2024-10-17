import React from "react";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoImage from "D:/EJAcotacoes/frontend/src/components/logo.png";

// Estilização do conteiner superior
const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #2c73d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
`;

// Estilização do botão dentro dos icons
const IconButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// Estilização do icon de voltar
const BackIcon = styled(FaArrowLeft)`
  color: #fff;
  font-size: 20px;
  margin-right: 10px;
`;

// Estilização da logo
const Logo = styled.img`
  height: 150px;
  width: auto;
  position: relative;
  left: -20px;
  top: -5px;
`;

const Content = styled.div`
  margin-top: 80px;
`;

// Organização do conteiner
const LayoutAdm = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <IconButton onClick={() => navigate(-1)}>
          <BackIcon />
          <Logo src={logoImage} alt="Logo" />
        </IconButton>
        <IconButton>
        </IconButton>
      </Container>
      <Content />
    </>
  );
};

export default LayoutAdm;
