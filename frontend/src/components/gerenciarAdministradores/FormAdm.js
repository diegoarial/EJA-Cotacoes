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

// Tamanho da caixa de input do título
const InputTitle = styled.input`
  width: 45.625rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

// Tamanho da caixa de input dos preços com restrições de números e decimais
const InputPrice = styled.input`
  width: 18.25rem;
  padding: 0 0.625rem;
  border: 1px solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

// Tamanho das caixas de input das medidas
const InputMeasures = styled.input`
  width: 8.9375rem;
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

// Obriga a preencher todos os campos para salvar
const PopupForm = ({ onSave, onClose, adm }) => {
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admForm = ref.current;

    if (
      !admForm.usuario.value ||
      !admForm.email.value ||
      !admForm.senha.value ||
      !admForm.nome.value ||
      !admForm.sobrenome.value ||
      !admForm.telefone.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    await onSave({
      usuario: admForm.usuario.value,
      email: admForm.email.value,
      senha: admForm.senha.value,
      nome: admForm.nome.value,
      sobrenome: admForm.sobrenome.value,
      telefone: admForm.telefone.value,
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
        <InputArea>
          <Label>Usuário</Label>
          <InputTitle
            name="usuario"
            maxLength="20"
            type="text"
            defaultValue={adm ? adm.usuario : ""}
          />
        </InputArea>
        <InputArea>
          <Label>E-mail</Label>
          <InputContainer>
            <InputPrice
              name="email"
              maxLength="100"
              type="text"
              defaultValue={adm ? adm.email : ""}
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Senha</Label>
          <InputContainer>
            <InputPrice
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
            <InputMeasures
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
            <InputMeasures
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
            <InputMeasures
              name="telefone"
              maxLength="15"
              type="text"
              defaultValue={adm ? adm.telefone : ""}
            />
          </InputContainer>
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
