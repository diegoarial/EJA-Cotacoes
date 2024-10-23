import React from "react";
import styled from "styled-components";
import logoImage from "D:/EJAcotacoes/frontend/src/components/logo.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
`;

const Logo = styled.img`
  width: 25rem;
  margin-left: -1.5625rem;
  margin-bottom: 1.25rem;
`;

const ButtonAdm = styled.button`
  width: 21.875rem;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 1px solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 2.625rem;
  margin: 0.625rem;
  font-size: 1.25rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6e5e1;
  }
`;

const ButtonCli = styled.button`
  width: 21.875rem;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
  font-size: 1.25rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  return (
    <Container>
      <Logo src={logoImage} alt="Logo" />
      <ButtonAdm onClick={() => (window.location.href = "/Login")}>
        Administrador
      </ButtonAdm>
      <ButtonCli onClick={() => (window.location.href = "/Cliente")}>
        Cotação de Produtos
      </ButtonCli>
    </Container>
  );
};

export default Home;
