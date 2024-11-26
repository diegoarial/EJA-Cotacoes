import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
  padding: 2rem;
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 21.875rem;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.625rem 1.25rem;
  border: 1px solid #ccc;
  border-radius: 0.3125rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2c73d2;
  }
`;

const IconButton = styled.div`
  position: absolute;
  right: -1.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  transition: color 0.3s;

  &:hover {
    color: #2c73d2;
  }
`;

const ButtonConfirm = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
  margin-top: 1rem;
`;


const ResetPassword = () => {
  const { token } = useParams();  // Pega o token da URL
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Token inválido ou ausente!");
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = () => {
    if (!newPassword) {
      toast.error("Por favor, insira uma nova senha.");
      return;
    }

    setLoading(true);

    fetch("http://localhost:8800/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          toast.success("Senha redefinida com sucesso!");
          setNewPassword("");
        } else {
          toast.error(data.message || "Erro ao redefinir senha.");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Erro ao redefinir senha, tente novamente.");
      });
  };

  return (
    <ResetPasswordContainer>
      <h2>Redefinir Senha</h2>
      <InputWrapper>
        <InputContainer>
            <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />
            <IconButton onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
            </IconButton>
        </InputContainer>
      </InputWrapper>
      <ButtonConfirm onClick={handleResetPassword} disabled={loading}>
        {loading ? "Redefinindo..." : "Redefinir Senha"}
      </ButtonConfirm>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
