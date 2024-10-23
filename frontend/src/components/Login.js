import React, { useState } from "react";
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
    const [error, setError] = useState(""); // Estado para gerenciar erros

    const handleLogin = () => {
        const data = {
            usuario: usuarioEmail, // Usando apenas 'usuario' para o login
            senha: senha,
        };
    
        fetch('http://localhost:8800/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                // Login bem-sucedido
                console.log("Login bem-sucedido!", data);
                localStorage.setItem("token", data.token); // Armazena o token
                window.location.href = "/Produtos"; // Redireciona
            } else {
                // Se não há token, é uma falha de login
                setError(data.message || "Erro desconhecido"); // Atualiza o estado de erro
            }
        })
        .catch(err => {
            console.error('Erro ao fazer login:', err);
            setError("Erro ao fazer login, tente novamente."); // Atualiza o estado de erro
        });
    };

    return (
        <Container>
            <Logo src={logoImage} alt="Logo" />
            <Input
                type="text"
                placeholder="Usuário ou Email"
                value={usuarioEmail}
                onChange={(e) => setUsuarioEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe a mensagem de erro, se houver */}
            <ButtonLogin onClick={handleLogin}>
                Entrar
            </ButtonLogin>
        </Container>
    );
};

export default Login;
