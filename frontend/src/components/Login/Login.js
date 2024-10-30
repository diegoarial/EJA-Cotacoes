import React, { useState } from "react";
import styled from "styled-components";
import logoImage from "D:/EJAcotacoes/frontend/src/components/logo.png";
import LayoutLogin from "./LayoutLogin";

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

const Input = styled.input`
  width: 21.875rem;
  padding: 0.625rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.3125rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2c73d2;
  }
`;

const ButtonLogin = styled.button`
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

const Login = () => {
  const [usuarioEmail, setUsuarioEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const data = {
      usuario: usuarioEmail,
      senha: senha,
    };

    fetch("http://localhost:8800/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/Produtos";
        } else {
          setError(data.message || "Erro desconhecido");
        }
      })

      .catch((err) => {
        console.error("Erro ao fazer login:", err);
        setError("Erro ao fazer login, tente novamente.");
      });
  };

  return (
    <>
    <LayoutLogin />
    <Container>
      <Logo src={logoImage} alt="Logo" />
      <Input
        type="text"
        placeholder="Usuário ou E-mail"
        value={usuarioEmail}
        onChange={(e) => setUsuarioEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <ButtonLogin onClick={handleLogin}>Entrar</ButtonLogin>
    </Container>
    </>
  );
};

export default Login;
