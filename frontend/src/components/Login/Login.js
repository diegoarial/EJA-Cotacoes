import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoImage from "D:/EJAcotacoes/frontend/src/components/logo2.png";
import LayoutLogin from "./LayoutLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  width: 21.875rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 1.25rem;
  padding-right: 2.5rem;
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
  margin-top: 1rem;
  font-size: 1.25rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const IconButton = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    color: #2c73d2;
  }
`;

const Login = () => {
  const [usuarioEmail, setUsuarioEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const logoutSuccess = localStorage.getItem("logoutSuccess");
    if (logoutSuccess === "true") {
      toast.success("Logout realizado com sucesso!");
      localStorage.removeItem("logoutSuccess");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          toast.success("Login realizado com sucesso!");
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
        <InputGroup>
          <InputContainer>
            <Input
              type="text"
              placeholder="Usuário ou E-mail"
              value={usuarioEmail}
              onChange={(e) => setUsuarioEmail(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
          </InputContainer>
        </InputGroup>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ButtonLogin onClick={handleLogin}>Entrar</ButtonLogin>
      </Container>
    </>
  );
};

export default Login;
