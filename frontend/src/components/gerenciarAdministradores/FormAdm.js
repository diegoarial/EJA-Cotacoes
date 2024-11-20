import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import styled from "styled-components";
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
  box-shadow: 0px 0px 0.3125rem #ccc;
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

// Input dentro de um input
const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const WarningText = styled.span`
  color: red;
  font-size: 0.875rem;
  position: absolute;
  top: 3rem;
`;

// Tamanho da caixa de input do título
const InputUser = styled.input`
  width: 45.625rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

// Tamanho da caixa de input dos preços com restrições de números e decimais
const InputEmail = styled.input`
  width: 21.1rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

const InputPassword = styled.input`
  width: 21.1rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

// Tamanho das caixas de input das medidas
const InputCell = styled.input`
  width: 13rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

// Tamanho das caixas de input das medidas
const InputNames = styled.input`
  width: 13rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

const Label = styled.label``;

// Estiliza o botão de cadastrar
const Button = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
`;

// Contêiner para alinhar o botão no canto superior direito
const TopRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  top: 5.125rem;
  right: 1.25rem;
  margin-top: 0.625rem;
`;

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

const PopupTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 0.3125rem;
  color: #333;
`;

// Obriga a preencher todos os campos para salvar
const PopupForm = ({ onSave, onClose, adm }) => {
  const ref = useRef();
  const [usuario, setUsuario] = useState(adm?.usuario || "");
  const [telefone, setTelefone] = useState(adm?.telefone || "");
  const [warnings, setWarnings] = useState({ usuario: "", email: "", telefone: "" });
  

  const validateUsuario = (value) => {
    if (value.length > 20) {
      setWarnings((prev) => ({ ...prev, usuario: "Usuário deve ter até 20 caracteres." }));
    } else {
      setWarnings((prev) => ({ ...prev, usuario: "" }));
    }
    setUsuario(value);
  };

  const formatTelefone = (value) => {
    let numericValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
  
    // Limita o número de dígitos a 11
    if (numericValue.length > 11) {
      numericValue = numericValue.slice(0, 11);
    }
  
    // Aplica a formatação
    if (numericValue.length === 11) {
      numericValue = numericValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (numericValue.length === 10) {
      numericValue = numericValue.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
  
    setTelefone(numericValue);
  };
  
  // Função para filtrar entradas no teclado
  const handleKeyDown = (e) => {
    // Permite apenas números, backspace, delete, setas e tab
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    const isNumberKey = /^[0-9]$/.test(e.key);
  
    if (!isNumberKey && !allowedKeys.includes(e.key)) {
      e.preventDefault(); // Bloqueia a tecla
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se algum campo está vazio
    if (!usuario || !telefone || !ref.current.email.value ||  !ref.current.nome.value || !ref.current.sobrenome.value || !ref.current.senha.value) {
      return toast.warn("Preencha todos os campos antes de salvar.");
    }

    // Checa se existem mensagens de aviso
    if (warnings.usuario || warnings.email || warnings.telefone) {
      return toast.warn("Corrija os erros antes de salvar.");
    }

    // Procede com o salvamento
    await onSave({
      usuario,
      telefone,
      email: ref.current.email.value,      
      nome: ref.current.nome.value,
      sobrenome: ref.current.sobrenome.value,
      senha: ref.current.senha.value,
    });
    onClose();
  };

  // Organização do pop-up e formulário
  return (
    <PopupContainer isOpen={true}>
      <FormContainer ref={ref} onSubmit={handleSubmit}>
        <CloseButton onClick={onClose}>
          <VscClose />
        </CloseButton>
        <PopupTitle>Cadastrar novo Administrador</PopupTitle>
        
        <InputArea>
          <Label>Usuário</Label>
          <InputUser
            name="usuario"
            maxLength="20"
            type="text"
            defaultValue={adm ? adm.usuario : ""}
            onChange={(e) => validateUsuario(e.target.value)}
          />
          {warnings.usuario && <WarningText>{warnings.usuario}</WarningText>}
        </InputArea>
        
        <InputArea>
          <Label>E-mail</Label>
          <InputContainer>
            <InputEmail
              name="email"
              maxLength="100"
              type="email"
              defaultValue={adm ? adm.email : ""}
            />
          </InputContainer>
          {warnings.email && <WarningText>{warnings.email}</WarningText>}
        </InputArea>
        
        <InputArea>
          <Label>Senha</Label>
          <InputContainer>
            <InputPassword
              name="senha"
              maxLength="30"
              type="text"
              defaultValue={adm ? adm.senha : ""}
            />
          </InputContainer>
        </InputArea>
        
        <InputArea>
          <Label>Nome</Label>
          <InputContainer>
            <InputNames
              name="nome"
              maxLength="20"
              type="text"
              defaultValue={adm ? adm.nome : ""}
            />
          </InputContainer>
        </InputArea>
        
        <InputArea>
          <Label>Sobrenome</Label>
          <InputContainer>
            <InputNames
              name="sobrenome"
              maxLength="30"
              type="text"
              defaultValue={adm ? adm.sobrenome : ""}
            />
          </InputContainer>
        </InputArea>
        
        <InputArea>
          <Label>Telefone</Label>
          <InputContainer>
            <InputCell
              name="telefone"
              maxLength="15"
              type="text"
              defaultValue={adm ? adm.telefone : ""}
              onChange={(e) => formatTelefone(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputContainer>
          {warnings.telefone && <WarningText>{warnings.telefone}</WarningText>}
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

// Função do formulário
const FormAdm = ({ getAdms, onEdit, setOnEdit }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (onEdit) {
      setIsPopupOpen(true);
    }
  }, [onEdit]);

  // Função de salvar
  const handleSave = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      if (onEdit) {
        await axios.put(
          `http://localhost:8800/administrador/${onEdit.idAdm}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post("http://localhost:8800/administrador/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      toast.success("Administrador salvo com sucesso!");
      getAdms();
    } catch (error) {
      toast.error("Erro ao salvar o administrador.");
    }
  };

  // Função para fechar o pop-up
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setOnEdit(null);
  };

  // Botão de abrir o pop-up e cadastrar um novo administrador
  return (
    <>
      <TopRightContainer>
        <Button onClick={() => setIsPopupOpen(true)}>
          Cadastrar administrador
        </Button>
      </TopRightContainer>
      {isPopupOpen && (
        <PopupForm
          onSave={handleSave}
          onClose={handleClosePopup}
          adm={onEdit}
        />
      )}
    </>
  );
};

export default FormAdm;
