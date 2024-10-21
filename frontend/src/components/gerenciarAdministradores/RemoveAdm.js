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
  width: 31.25rem;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0 0 0.3125rem #ccc;
  border-radius: 0.3125rem;
  position: relative;
  text-align: center;
`;

// Estilização do botão de fechar
const CloseButton = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  padding: 0.3125rem;
  border: none;
  background: transparent;
  cursor: pointer;
`;

// Estilização da Mensagem
const Message = styled.p`
  font-size: 1rem;
  margin: 1.25rem 0;
`;

// Estilização do botão do contêiner
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
`;

// Estilização do botão de confirmar a exclusão
const ButtonConfirm = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
`;

// Estilização do botão de cancelar a exclusão
const ButtonCancel = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 1px solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 2.625rem;
`;

// Organização do popup de confirmar a remoção de um administrador
const RemoveAdm = ({ isOpen, onClose, onConfirm }) => {
  return (
    <PopupContainer isOpen={isOpen}>
      <ConfirmContainer>
        <CloseButton onClick={onClose}>
          <VscClose />
        </CloseButton>
        <Message>
          Deseja realmente excluir este administrador? Esta alteração não poderá
          ser desfeita.
        </Message>
        <ButtonContainer>
          <ButtonConfirm onClick={onConfirm}>Excluir</ButtonConfirm>
          <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
        </ButtonContainer>
      </ConfirmContainer>
    </PopupContainer>
  );
};

export default RemoveAdm;
