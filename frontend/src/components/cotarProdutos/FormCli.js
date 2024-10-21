import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { VscClose } from "react-icons/vsc";

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
  width: 47rem;
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

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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

const ButtonCancel = styled.button`
  width: 6.25rem;
  padding: 0.625rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 0.0625rem solid blue;
  background-color: #fff;
  color: #2c73d2;
  height: 2.625rem;
  margin-top: 1.25rem;
`;

const PopupTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 0.3125rem;
  color: #333;
`;

const PopupMsg = styled.h4`
  width: 100%;
  text-align: center;
  color: #333;
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
  border: 0.0625rem solid #ddd;
  border-radius: 0.3125rem;
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
  border: 0.0625rem solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

const InputPrice = styled.input`
  width: 42.9375rem;
  padding: 0 0.625rem;
  border: 0.0625rem solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
  max-width: 100%;
`;

const InputMeasures = styled.input`
  width: 8.9375rem;
  padding: 0 0.625rem;
  border: 0.0625rem solid #bbb;
  border-radius: 0.3125rem;
  height: 2.5rem;
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

  return <>{produto && <PopupForm onClose={onClose} produto={produto} />}</>;
};

export default FormCli;
