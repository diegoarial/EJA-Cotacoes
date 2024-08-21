import React from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";

// Estilização do popup de remover
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

// Estilização da confirmação do popup
const ConfirmContainer = styled.div`
  width: 500px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  position: relative;
  text-align: center;
`;

// Estilização do botão de fechar
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

// Estilização da Mensagem
const Message = styled.p`
  font-size: 16px;
  margin: 20px 0;
`;

// Estilização do botão do conteiner
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

// Estilização do botão de confirmar a exclusão
const ButtonConfirm = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

// Estilização do botão de cancelar a exclusão
const ButtonCancel = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 42px;
`;

// Organização do popup de confirmação de remoção de item
const RemoveCart = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <PopupContainer isOpen={isOpen}>
      <ConfirmContainer>
        <CloseButton onClick={onClose}>
          <VscClose />
        </CloseButton>
        <Message>{message}</Message>
        <ButtonContainer>
          <ButtonConfirm onClick={onConfirm}>Confirmar</ButtonConfirm>
          <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
        </ButtonContainer>
      </ConfirmContainer>
    </PopupContainer>
  );
};

export default RemoveCart;
