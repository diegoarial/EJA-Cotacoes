import React from "react";
import styled from "styled-components";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoImage from "D:/EJAcotacoes/frontend/src/components/logo.png";

// Estilização do conteiner superior
const Container = styled.div`
  width: 100%;
  height: 4.375rem;
  background-color: #2c73d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  box-shadow: 0px 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
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
  font-size: 1.25rem;
  margin-right: 0.625rem;
`;

// Estilização do icon de usuario
const UserIcon = styled(FaUser)`
  color: #fff;
  font-size: 1.25rem;
  margin-right: 3.125rem;
`;

// Estilização da logo
const Logo = styled.img`
  height: 9.375rem;
  width: auto;
  position: relative;
  left: -1.25rem;
  top: -0.3125rem;
`;

const Content = styled.div`
  margin-top: 5rem;
`;

// Organização do conteiner
const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <IconButton onClick={() => navigate(-1)}>
          <BackIcon />
          <Logo src={logoImage} alt="Logo" />
        </IconButton>
        <IconButton onClick={() => navigate("/Administrador")}>
          <UserIcon />
        </IconButton>
      </Container>
      <Content />
    </>
  );
};

export default Layout;
