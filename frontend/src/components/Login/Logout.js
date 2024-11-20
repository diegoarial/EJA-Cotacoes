import React from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

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

const Logout = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      localStorage.setItem("logoutSuccess", "true");
      navigate("/login");
    }, 100);
  };

  return (
    <PopupContainer isOpen={isOpen}>
      <ConfirmContainer>
        <CloseButton onClick={onClose}>
          <VscClose />
        </CloseButton>
        <Message>Você realmente deseja sair?</Message>
        <ButtonContainer>
          <ButtonConfirm onClick={handleLogout}>Confirmar</ButtonConfirm>
          <ButtonCancel onClick={onClose}>Cancelar</ButtonCancel>
        </ButtonContainer>
      </ConfirmContainer>
    </PopupContainer>
  );
};

export default Logout;
