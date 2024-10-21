import React, { useState } from "react";
import styled from "styled-components";
import { FiPlusCircle, FiMinusCircle, FiEye } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormCli from "./FormCli";
import axios from "axios";

const Table = styled.table`
  width: 100%;
  height: auto;
  width: 50rem;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0rem 0rem 0.3125rem #ccc;
  border-radius: 0.3125rem;
  margin: 1.25rem auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 0.3125rem;

  @media (max-width: 31.25rem) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 0.9375rem;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 31.25rem) {
    ${(props) => props.onlyweb && "display: none"}
  }
`;

const IconContainer = styled.div`
  overflow: visible;
`;

const PlusIcon = styled(FiPlusCircle)`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1rem;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 0.125rem solid transparent;
  border-radius: 50%;
  transform-origin: top center;
  z-index: 1;

  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

const MinusIcon = styled(FiMinusCircle)`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1rem;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 0.125rem solid transparent;
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
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1rem;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 0.125rem solid transparent;
  border-radius: 50%;
  transform-origin: top center;
  z-index: 1;

  &:hover {
    transform: scale(1.3);
    color: #000;
    background-color: #ccc;
  }
`;

const CartPlusIcon = styled(FaCartPlus)`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1rem;
  text-align: center;
  cursor: pointer;
  transition: none;
  border: 0.125rem solid transparent;
  border-radius: 40%;
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
  padding: 0.5rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  box-sizing: border-box;
  font-size: 0.875rem;
  text-align: center;

  &:focus {
    border-color: #2c73d2;
    outline: none;
    box-shadow: 0 0 0 0.125rem rgba(0, 123, 255, 0.25);
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
    if (value === "" || /^\d+$/.test(value)) {
      setValues((prevValues) => ({
        ...prevValues,
        [idProduto]: value,
      }));
    }
  };

  // Função para aumentar o valor do input em 1
  const incrementValue = (idProduto) => {
    setValues((prevValues) => {
      const currentValue = parseInt(prevValues[idProduto] || 0, 10);
      return {
        ...prevValues,
        [idProduto]: currentValue + 1,
      };
    });
  };

  // Função para diminuir o valor do input em 1
  const decrementValue = (idProduto) => {
    setValues((prevValues) => {
      const currentValue = parseInt(prevValues[idProduto] || 0, 10);
      return {
        ...prevValues,
        [idProduto]: Math.max(0, currentValue - 1),
      };
    });
  };

  // Função para fechar o popup
  const handleClosePopup = () => {
    setIsFormCliOpen(false);
    setSelectedProduct(null);
  };

  // Função para adicionar produtos ao carrinho
  const handleAddToCart = async (idProduto, quantidade) => {
    if (quantidade > 0) {
      try {
        await axios.post("http://localhost:8800/carrinho/", {
          idProduto: parseInt(idProduto, 10),
          quantidade: parseInt(quantidade, 10),
          precoVenda: produtos.find(
            (produto) => produto.idProduto === parseInt(idProduto, 10)
          ).precoVenda,
        });

        toast.success(`Produto adicionado ao carrinho!`, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setValues((prevValues) => ({
          ...prevValues,
          [idProduto]: "",
        }));
      } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        toast.error("Erro ao adicionar produto ao carrinho.", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.warning("Por favor, selecione uma quantidade maior que zero.", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {produtos.map((item, i) => (
            <Tr key={i}>
              <Td width="45%">{item.titulo}</Td>
              <Td width="30%">{item.precoVenda}</Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <PlusIcon onClick={() => incrementValue(item.idProduto)} />
                </IconContainer>
              </Td>
              <Td>
                <NumberInput
                  type="text"
                  value={values[item.idProduto] || ""}
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
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <CartPlusIcon
                    onClick={() =>
                      handleAddToCart(
                        item.idProduto,
                        values[item.idProduto] || 0
                      )
                    }
                  />
                </IconContainer>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ToastContainer />
      {isFormCliOpen && selectedProduct && (
        <FormCli produto={selectedProduct} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default GridCli;
