import React, { useState } from "react";
import styled from "styled-components";
import { FiPlusCircle, FiMinusCircle, FiEye } from "react-icons/fi";

// Edição da tabela do Grid 
const Table = styled.table`
  width: 100%;
  height: auto;
  width: 800px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

const IconContainer = styled.div`
  overflow: visible;
`;

// Edição e posicionamento do icon de mais
const PlusIcon = styled(FiPlusCircle)`
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 2px solid transparent;
  border-radius: 50%;
  transform-origin: top center;
  z-index: 1;

  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

// Edição e posicionamento do icon de menos
const MinusIcon = styled(FiMinusCircle)`
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 2px solid transparent;
  border-radius: 45%;
  transform-origin: top center;

  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

const EyeIcon = styled(FiEye)`
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 2px solid transparent;
  border-radius: 50%;
  transform-origin: top center;
  z-index: 1;

  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

const NumberInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;

  &:focus {
    border-color: #2c73d2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

// Funções da tabela de dados
const GridCli = ({ produtos, setProdutos, setOnEdit }) => {
  const [setIsDeletePopupOpen] = useState(false);
  const [setProductIdToDelete] = useState(null);
  const [values, setValues] = useState({}); // Estado para valores individuais dos inputs


  // Função de Edição
  const handleEdit = (item) => {
    setOnEdit(item);
  };
  
  // Abrir popup de confirmação de exclusão
  const openDeletePopup = (idProduto) => {
    setProductIdToDelete(idProduto);
    setIsDeletePopupOpen(true);
  };

// Função para lidar com mudanças no input e permitir apenas números inteiros
const handleInputChange = (e, idProduto) => {
  const value = e.target.value;
  // Permite apenas números inteiros ou uma string vazia
  if (value === '' || /^\d+$/.test(value)) {
    setValues((prevValues) => ({
      ...prevValues,
      [idProduto]: value
    }));
  }
};

  // Organização do grid
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Título</Th>
            <Th>Preço de Venda</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {produtos.map((item, i) => (
            <Tr key={i}>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <EyeIcon onClick={() => handleEdit(item)}/>
                </IconContainer>
              </Td>
              <Td width="50%">{item.titulo}</Td>
              <Td width="30%">{item.precoVenda}</Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <PlusIcon onClick={() => handleEdit(item)} />
                </IconContainer>
              </Td>
              <Td>
                <NumberInput
                  type="text" // Usando type="text" ao invés de number
                  value={values[item.idProduto] || ''}
                  onChange={(e) => handleInputChange(e, item.idProduto)}
                />
              </Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <MinusIcon onClick={() => openDeletePopup(item.idProduto)} />
                </IconContainer>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default GridCli;
