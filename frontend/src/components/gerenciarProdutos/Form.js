import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import styled from "styled-components";
import { toast } from "react-toastify";

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

const FormContainer = styled.form`
  width: 46.875rem;
  display: flex;
  align-items: flex-end;
  gap: 1.875rem;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0rem 0rem 0.313rem #ccc;
  border-radius: 0.313rem;
  position: relative;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  padding: 0.313rem;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const CurrencySymbolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  border: 0.063rem solid #ddd;
  border-radius: 0.313rem;
  padding: 0 0.625rem;
  background-color: #f8f9fa;
`;

const CurrencySymbolText = styled.span`
  font-size: 1.125rem;
  color: #555;
`;

const InputTitle = styled.input`
  width: 45.625rem;
  padding: 0 0.625rem;
  border: 0.063rem solid #bbb;
  border-radius: 0.313rem;
  height: 2.5rem;
  max-width: 100%;
`;

const InputPrice = styled.input`
  width: 18.25rem;
  padding: 0 0.625rem;
  border: 0.063rem solid #bbb;
  border-radius: 0.313rem;
  height: 2.5rem;
  max-width: 100%;
`;

const InputMeasures = styled.input`
  width: 8.938rem;
  padding: 0 0.625rem;
  border: 0.063rem solid #bbb;
  border-radius: 0.313rem;
  height: 2.5rem;
  max-width: 100%;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.313rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
`;

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

const ButtonSave = styled.button`
  width: 6.25rem;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.313rem;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 2.625rem;
  margin-right: 0.625rem;
`;

const ButtonCancel = styled.button`
  width: 6.25rem;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.313rem;
  border: 0.063rem solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 2.625rem;
`;

// Obriga a preencher todos os campos para salvar
const PopupForm = ({ onSave, onClose, produto }) => {
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const produtoForm = ref.current;

    if (
      !produtoForm.titulo.value ||
      !produtoForm.precoVenda.value ||
      !produtoForm.precoCusto.value ||
      !produtoForm.peso.value ||
      !produtoForm.altura.value ||
      !produtoForm.largura.value ||
      !produtoForm.profundidade.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    await onSave({
      titulo: produtoForm.titulo.value,
      precoVenda: produtoForm.precoVenda.value,
      precoCusto: produtoForm.precoCusto.value,
      peso: produtoForm.peso.value,
      altura: produtoForm.altura.value,
      largura: produtoForm.largura.value,
      profundidade: produtoForm.profundidade.value,
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
          <Label>Título</Label>
          <InputTitle
            name="titulo"
            maxLength="200"
            type="text"
            defaultValue={produto ? produto.titulo : ""}
          />
        </InputArea>
        <InputArea>
          <Label>Preço de Venda</Label>
          <InputContainer>
            <CurrencySymbolBox>
              <CurrencySymbolText>R$</CurrencySymbolText>
            </CurrencySymbolBox>
            <InputPrice
              name="precoVenda"
              type="number"
              step=".01"
              pattern="\d{0,5}(?:\.\d{0,2})?"
              title="Insira até 5 dígitos antes da vírgula, incluindo 2 após o ponto."
              defaultValue={produto ? produto.precoVenda : ""}
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Preço de Custo</Label>
          <InputContainer>
            <CurrencySymbolBox>
              <CurrencySymbolText>R$</CurrencySymbolText>
            </CurrencySymbolBox>
            <InputPrice
              name="precoCusto"
              type="number"
              step=".01"
              pattern="\d{0,5}(?:\.\d{0,2})?"
              title="Insira até 5 dígitos antes da vírgula, incluindo 2 após o ponto."
              defaultValue={produto ? produto.precoCusto : ""}
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Peso (g)</Label>
          <InputContainer>
            <InputMeasures
              name="peso"
              type="number"
              step="any"
              defaultValue={produto ? produto.peso : ""}
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Altura (cm)</Label>
          <InputContainer>
            <InputMeasures
              name="altura"
              type="number"
              step="any"
              defaultValue={produto ? produto.altura : ""}
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Largura (cm)</Label>
          <InputContainer>
            <InputMeasures
              name="largura"
              type="number"
              step="any"
              defaultValue={produto ? produto.largura : ""}
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Profundidade (cm)</Label>
          <InputContainer>
            <InputMeasures
              name="profundidade"
              type="number"
              step="any"
              defaultValue={produto ? produto.profundidade : ""}
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
const Form = ({ getProdutos, onEdit, setOnEdit }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (onEdit) {
      setIsPopupOpen(true);
    }
  }, [onEdit]);

  // Função de salvar
  const handleSave = async (formData) => {
    try {
      if (onEdit) {
        await axios.put(
          `http://localhost:8800/produto/${onEdit.idProduto}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8800/produto/", formData);
      }
      toast.success("Produto salvo com sucesso!");
      getProdutos();
    } catch (error) {
      toast.error("Erro ao salvar o produto.");
    }
  };

  // Função para fechar o pop-up
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setOnEdit(null);
  };

  // Botão de abrir o pop-up e cadastrar um novo produto
  return (
    <>
      <TopRightContainer>
        <Button onClick={() => setIsPopupOpen(true)}>
          Cadastrar novo produto
        </Button>
      </TopRightContainer>
      {isPopupOpen && (
        <PopupForm
          onSave={handleSave}
          onClose={handleClosePopup}
          produto={onEdit}
        />
      )}
    </>
  );
};

export default Form;
