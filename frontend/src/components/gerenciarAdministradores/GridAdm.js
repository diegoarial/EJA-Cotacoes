import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import RemoveAdm from "./RemoveAdm.js";

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

// Edição e posicionamento do icon de editar
const EditIcon = styled(FaEdit)`
  display: inline-block;
  width: 16px;
  height: 16px;
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

// Edição e posicionamento do icon de remover
const DeleteIcon = styled(FaTrash)`
  display: inline-block;
  width: 16px;
  height: 16px;
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

// Funções da tabela de dados
const GridAdm = ({ adms, setAdms, setOnEdit }) => {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [admIdToDelete, setAdmIdToDelete] = useState(null);

  // Função de Edição
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  // Função de Remoção
  const handleDelete = async (idAdm) => {
    try {
      await axios.put(`http://localhost:8800/produto/${idAdm}/inactivate`);
      const newArray = adms.filter(
        (adm) => adm.idAdm !== idAdm
      );
      setAdms(newArray);
      toast.success("Administrador removido com sucesso.");
    } catch (error) {
      toast.error("Erro ao remover o administrador.");
    }
  };

  // Abrir popup de confirmação de exclusão
  const openDeletePopup = (idAdm) => {
    setAdmIdToDelete(idAdm);
    setIsDeletePopupOpen(true);
  };

  // Fechar popup de confirmação de exclusão
  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setAdmIdToDelete(null);
  };

  // Função de confirmar a remoção do produto
  const confirmDelete = () => {
    if (admIdToDelete) {
      handleDelete(admIdToDelete);
    }
    closeDeletePopup();
  };

  // Organização do grid
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>SKU</Th>
            <Th>Título</Th>
            <Th>Preço de Venda</Th>
            <Th>Preço de Custo</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {adms.map((item, i) => (
            <Tr key={i}>
              <Td width="10%">{item.idProduto}</Td>
              <Td width="50%">{item.titulo}</Td>
              <Td width="10%">{item.precoVenda}</Td>
              <Td width="10%">{item.precoCusto}</Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <EditIcon onClick={() => handleEdit(item)} />
                </IconContainer>
              </Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <DeleteIcon onClick={() => openDeletePopup(item.idProduto)} />
                </IconContainer>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isDeletePopupOpen && (
        <RemoveAdm
          isOpen={isDeletePopupOpen}
          onClose={closeDeletePopup}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default GridAdm;
