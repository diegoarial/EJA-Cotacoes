import React, { useState } from "react";
import styled from "styled-components";
import { FiPlusCircle, FiMinusCircle, FiEye } from "react-icons/fi";
import FormCli from "./FormCli";

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


const GridCli = ({ produtos }) => {
  const [isFormCliOpen, setIsFormCliOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [values, setValues] = useState({});

  const handleView = (item) => {
    setSelectedProduct(item);
    setIsFormCliOpen(true);
  };

  // Função para lidar com mudanças no input e permitir apenas números inteiros
  const handleInputChange = (e, idProduto) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setValues((prevValues) => ({
        ...prevValues,
        [idProduto]: value
      }));
    }
  };

  // Função para aumentar o valor do input em 1
  const incrementValue = (idProduto) => {
    setValues((prevValues) => {
      const currentValue = parseInt(prevValues[idProduto] || 0, 10);
      return {
        ...prevValues,
        [idProduto]: currentValue + 1
      };
    });
  };

  // Função para diminuir o valor do input em 1
  const decrementValue = (idProduto) => {
    setValues((prevValues) => {
      const currentValue = parseInt(prevValues[idProduto] || 0, 10);
      return {
        ...prevValues,
        [idProduto]: Math.max(0, currentValue - 1)
      };
    });
  };

  // Função para fechar o popup
  const handleClosePopup = () => {
    setIsFormCliOpen(false);
    setSelectedProduct(null);
  };

  // Organização do grid
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Preço de Venda</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {produtos.map((item, i) => (
            <Tr key={i}>
              <Td width="50%">{item.titulo}</Td>
              <Td width="30%">{item.precoVenda}</Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <PlusIcon onClick={() => incrementValue(item.idProduto)} />
                </IconContainer>
              </Td>
              <Td>
                <NumberInput
                  type="text"
                  value={values[item.idProduto] || ''}
                  onChange={(e) => handleInputChange(e, item.idProduto)}
                />
              </Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <MinusIcon onClick={() => decrementValue(item.idProduto)} />
                </IconContainer>
              </Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <EyeIcon onClick={() => handleView(item)} />
                </IconContainer>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isFormCliOpen && (
        <FormCli
          produto={selectedProduct}
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default GridCli;
