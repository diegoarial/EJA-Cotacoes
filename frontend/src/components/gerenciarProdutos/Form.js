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

// Input dentro de um input
const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// Caixa do Símbolo
const CurrencySymbolBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 10px;
  background-color: #f8f9fa;
`;

// Colocar símbolo dentro da caixa
const CurrencySymbolText = styled.span`
  font-size: 18px;
  color: #555;
`;

// Tamanho da caixa de input do título
const InputTitle = styled.input`
  width: 730px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  max-width: 100%;
`;

// Tamanho da caixa de input dos preços com restrições de números e decimais
const InputPrice = styled.input`
  width: 292px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  max-width: 100%;
`;

// Tamanho das caixas de input das medidas
const InputMeasures = styled.input`
  width: 143px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
  max-width: 100%;
  }`;

const Label = styled.label``;

// Estiliza o botão de cadastrar
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

// Contêiner para alinhar o botão no canto superior direito
const TopRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  position: absolute;
  top: 82px;
  right: 20px;
  margin-top: 10px;
`;

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
        await axios.put(`http://localhost:8800/${onEdit.idProduto}`, formData);
      } else {
        await axios.post("http://localhost:8800", formData);
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
