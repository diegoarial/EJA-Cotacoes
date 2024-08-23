import React, { useRef } from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";
import { toast } from "react-toastify";

// Estilização do pop-up
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
  z-index: 100;
`;

// Estilização do formulário dentro do pop-up
const FormContainer = styled.form`
  width: 750px;
  display: flex;
  align-items: flex-end;
  gap: 30px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  position: relative;
`;

// Caixa do botão para centralizá-lo
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// Estilização do botão de fechar no canto superior direito
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

// Edita a área de escrita
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

// Tamanho da caixa de input dos dados do cliente
const InputClient = styled.input`
  width: 100%;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  max-width: 100%;
`;

const Label = styled.label``;

// Estiliza o botão de salvar
const ButtonSave = styled.button`
  width: 100px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  margin-right: 10px;
`;

// Estiliza o botão de cancelar
const ButtonCancel = styled.button`
  width: 100px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 42px;
`;

const FormCart = ({ onSave, onClose, cliente }) => {
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteForm = ref.current;

    if (
      !clienteForm.cpf.value ||
      !clienteForm.nome.value ||
      !clienteForm.sobrenome.value ||
      !clienteForm.telefone.value ||
      !clienteForm.email.value ||
      !clienteForm.empresa.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    await onSave({
      cpf: clienteForm.cpf.value,
      nome: clienteForm.nome.value,
      sobrenome: clienteForm.sobrenome.value,
      telefone: clienteForm.telefone.value,
      email: clienteForm.email.value,
      empresa: clienteForm.empresa.value,
    });
    onClose();
  };

  return (
    <PopupContainer isOpen={true}>
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <CloseButton onClick={onClose}>
          <VscClose />
        </CloseButton>
        <InputArea>
          <Label>CPF</Label>
          <InputClient
            name="cpf"
            maxLength="14"
            type="text"
            defaultValue={cliente ? cliente.cpf : ""}
          />
        </InputArea>
        <InputArea>
          <Label>Nome</Label>
          <InputClient
            name="nome"
            maxLength="30"
            type="text"
            defaultValue={cliente ? cliente.nome : ""}
          />
        </InputArea>
        <InputArea>
          <Label>Sobrenome</Label>
          <InputClient
            name="sobrenome"
            maxLength="40"
            type="text"
            defaultValue={cliente ? cliente.sobrenome : ""}
          />
        </InputArea>
        <InputArea>
          <Label>Telefone</Label>
          <InputClient
            name="telefone"
            maxLength="14"
            type="text"
            defaultValue={cliente ? cliente.telefone : ""}
          />
        </InputArea>
        <InputArea>
          <Label>Email</Label>
          <InputClient
            name="email"
            maxLength="100"
            type="email"
            defaultValue={cliente ? cliente.email : ""}
          />
        </InputArea>
        <InputArea>
          <Label>Empresa</Label>
          <InputClient
            name="empresa"
            maxLength="50"
            type="text"
            defaultValue={cliente ? cliente.empresa : ""}
          />
        </InputArea>
        <ButtonContainer>
          <ButtonSave type="submit">SALVAR</ButtonSave>
          <ButtonCancel type="button" onClick={onClose}>
            CANCELAR
          </ButtonCancel>
        </ButtonContainer>
      </FormContainer>
    </PopupContainer>
  );
};

export default FormCart;
