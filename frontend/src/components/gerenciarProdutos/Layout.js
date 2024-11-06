import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoImage from "D:/EJAcotacoes/frontend/src/components/logo.png";
import Logout from "../Login/Logout";

// Estilização do contêiner superior
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

// Estilização do botão dentro dos ícones
const IconButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// Estilização do ícone de voltar
const BackIcon = styled(FaArrowLeft)`
  color: #fff;
  font-size: 1.25rem;
  margin-right: 0.625rem;
`;

// Estilização do ícone de usuário
const UserIcon = styled(FaUser)`
  color: #fff;
  font-size: 1.25rem;
  margin-right: 1.5rem;
`;

// Estilização do ícone de logout
const LogoutIcon = styled(FaSignOutAlt)`
  color: #fff;
  font-size: 1.25rem;
  margin-right: 1.25rem;
`;

// Estilização da logo
const Logo = styled.img`
  height: 9.375rem;
  width: auto;
  position: relative;
  left: -1.25rem;
  top: -0.3125rem;
`;

// Agrupamento dos ícones de user e logout para organização
const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const Content = styled.div`
  margin-top: 5rem;
`;

// Organização do contêiner
const Layout = () => {
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Função para abrir o popup de logout
  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  return (
    <>
      <Container>
        <IconButton onClick={handleLogoutClick}>
          <BackIcon />
          <Logo src={logoImage} alt="Logo" />
        </IconButton>
        <IconsWrapper>
          <IconButton onClick={() => navigate("/Administrador")}>
            <UserIcon />
          </IconButton>
          <IconButton onClick={handleLogoutClick}>
            <LogoutIcon />
          </IconButton>
        </IconsWrapper>
      </Container>
      <Content />
      <Logout
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </>
  );
};

export default Layout;
