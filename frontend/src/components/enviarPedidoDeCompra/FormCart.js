import React, { useRef, useState } from "react";
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
  width: 46.875rem;
  display: flex;
  align-items: flex-end;
  gap: 1.875rem;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.3125rem;
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
  top: 0.625rem;
  right: 0.625rem;
  padding: 0.3125rem;
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
  width: 12.8125rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

const Label = styled.label``;

// Estiliza o botão de salvar
const ButtonSave = styled.button`
  width: 6.25rem;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
  margin-right: 0.625rem;
`;

// Estiliza o botão de cancelar
const ButtonCancel = styled.button`
  width: 6.25rem;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 1px solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 2.625rem;
`;

// Título do pop-up
const PopupTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 0.3125rem;
  color: #333;
`;

const FormCart = ({ onSave, onClose, cliente }) => {
  const ref = useRef();
  const [formData, setFormData] = useState(cliente || {});
  const [telefone, setTelefone] = useState(cliente?.telefone || "");

  const formatCPF = (value) => {
    let numericValue = value.replace(/\D/g, "");
  

    if (numericValue.length > 11) {
      numericValue = numericValue.slice(0, 11);
    }
  

    if (numericValue.length > 3) {
      numericValue = `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
    }
    if (numericValue.length > 6) {
      numericValue = `${numericValue.slice(0, 7)}.${numericValue.slice(7)}`;
    }
    if (numericValue.length > 9) {
      numericValue = `${numericValue.slice(0, 11)}-${numericValue.slice(11)}`;
    }
  
    setFormData((prev) => ({ ...prev, cpf: numericValue }));
  };
  

  const handleKeyDownCPF = (e) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    const isNumberKey = /^[0-9]$/.test(e.key);
  
    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const formatTelefone = (value) => {
    let numericValue = value.replace(/\D/g, "");
  
    if (numericValue.length > 11) {
      numericValue = numericValue.slice(0, 11);
    }
    if (numericValue.length === 11) {
      numericValue = numericValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numericValue.length === 10) {
      numericValue = numericValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
  
    setTelefone(numericValue);
  };
  
  const handleKeyDown = (e) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    const isNumberKey = /^[0-9]$/.test(e.key);
  
    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

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
      telefone,
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
        <PopupTitle>Insira seus dados</PopupTitle>
        <InputArea>
          <Label>CPF</Label>
          <InputClient
            name="cpf"
            maxLength="14"
            type="text"
            value={formData.cpf || ""}
            onChange={(e) => formatCPF(e.target.value)}
            onKeyDown={handleKeyDownCPF}
          />
        </InputArea>
        <InputArea>
          <Label>Nome</Label>
          <InputClient
            name="nome"
            maxLength="30"
            type="text"
            value={formData.nome || ""}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        </InputArea>
        <InputArea>
          <Label>Sobrenome</Label>
          <InputClient
            name="sobrenome"
            maxLength="40"
            type="text"
            value={formData.sobrenome || ""}
            onChange={(e) =>
              setFormData({ ...formData, sobrenome: e.target.value })
            }
          />
        </InputArea>
        <InputArea>
          <Label>Telefone</Label>
          <InputClient
            name="telefone"
            maxLength="15"
            type="text"
            defaultValue={cliente ? cliente.telefone : ""}
            onChange={(e) => formatTelefone(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputArea>
        <InputArea>
          <Label>Email</Label>
          <InputClient
            name="email"
            maxLength="100"
            type="email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </InputArea>
        <InputArea>
          <Label>Empresa</Label>
          <InputClient
            name="empresa"
            maxLength="50"
            type="text"
            value={formData.empresa || ""}
            onChange={(e) =>
              setFormData({ ...formData, empresa: e.target.value })
            }
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