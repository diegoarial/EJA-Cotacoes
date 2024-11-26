import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { VscClose } from "react-icons/vsc";
import GlobalStyle from "../../styles/global";


const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const ConfirmContainer = styled.div`
  width: 31.25rem;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.3125rem;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  padding: 0.3125rem;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Message = styled.p`
  font-size: 1rem;
  margin: 1.25rem 0;
`;

const InputField = styled.input`
  width: 80%;
  padding: 0.625rem;
  border: 1px solid #ccc;
  border-radius: 0.3125rem;
  margin-bottom: 0.625rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2c73d2;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
`;

const ButtonConfirm = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
`;

const ButtonCancel = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 0.0625rem solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 2.625rem;
`;

const ForgotPass = ({ isOpen, onClose }) => {
  const [resetUser, setResetUser] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  const handleSendResetEmail = () => {
    const data = { usuario: resetUser, email: resetEmail };

    fetch("http://localhost:8800/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("E-mail enviado com sucesso!");
          setResetUser("");
          setResetEmail("");
          onClose();
        } else {
          toast.error(data.message || "Erro ao processar solicitação.");
        }
      })
      .catch(() => {
        toast.error("Erro ao enviar solicitação. Tente novamente.");
      });
  };

  return (
    <PopupContainer isOpen={isOpen}>
      <ConfirmContainer>
        <CloseButton onClick={onClose}>
          <VscClose />
        </CloseButton>
        <GlobalStyle />
        <Message>Redefinir Senha</Message>
        <InputField
          type="text"
          placeholder="Usuário"
          value={resetUser}
          onChange={(e) => setResetUser(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="E-mail"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <ButtonContainer>
          <ButtonConfirm onClick={handleSendResetEmail}>Enviar</ButtonConfirm>
          <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
        </ButtonContainer>
      </ConfirmContainer>
    </PopupContainer>
  );
};

export default ForgotPass;
