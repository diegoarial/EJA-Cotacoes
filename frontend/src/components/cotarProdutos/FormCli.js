import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";

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
  margin-top: 20px;
`;

// Título do pop-up
const PopupTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
  color: #333;
`;

// Mensagem do pop-up
const PopupMsg = styled.h4`
  width: 100%;
  text-align: center;
  color: #333;
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
  width: 687px;
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
`;

const Label = styled.label``;

// Remover o preço de custo do formulário
const PopupForm = ({ onClose, produto }) => {
  const ref = useRef();

  // Função para fechar o pop-up
  const handleClosePopup = () => {
    onClose();
  };

  // Organização do pop-up e formulário
  return (
    <PopupContainer isOpen={true}>
      <FormContainer ref={ref}>
        <CloseButton onClick={handleClosePopup}>
          <VscClose />
        </CloseButton>
        <PopupTitle>Visualizar Dados do Produto</PopupTitle>
        <InputArea>
          <Label>Título</Label>
          <InputTitle
            name="titulo"
            defaultValue={produto ? produto.titulo : ""}
            readOnly
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
              defaultValue={produto ? produto.precoVenda : ""}
              readOnly
            />
          </InputContainer>
        </InputArea>
        <PopupMsg>Medidas de Embalagem</PopupMsg>
        <InputArea>
          <Label>Peso (g)</Label>
          <InputContainer>
            <InputMeasures
              name="peso"
              defaultValue={produto ? produto.peso : ""}
              readOnly
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Altura (cm)</Label>
          <InputContainer>
            <InputMeasures
              name="altura"
              defaultValue={produto ? produto.altura : ""}
              readOnly
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Largura (cm)</Label>
          <InputContainer>
            <InputMeasures
              name="largura"
              defaultValue={produto ? produto.largura : ""}
              readOnly
            />
          </InputContainer>
        </InputArea>
        <InputArea>
          <Label>Profundidade (cm)</Label>
          <InputContainer>
            <InputMeasures
              name="profundidade"
              defaultValue={produto ? produto.profundidade : ""}
              readOnly
            />
          </InputContainer>
        </InputArea>
        <ButtonContainer>
          <ButtonCancel type="button" onClick={handleClosePopup}>
            Fechar
          </ButtonCancel>
        </ButtonContainer>
      </FormContainer>
    </PopupContainer>
  );
};

// Função do formulário
const FormCli = ({ produto, onClose }) => {
  useEffect(() => {
    if (!produto) {
      onClose();
    }
  }, [produto, onClose]);

  return (
    <>
      {produto && (
        <PopupForm
          onClose={onClose}
          produto={produto}
        />
      )}
    </>
  );
};

export default FormCli;
