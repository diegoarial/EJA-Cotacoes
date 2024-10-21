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
  width: 50rem;
  background-color: #fff;
  padding: 1.25rem;
  box-shadow: 0 0 0.3125rem #ccc;
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

// Edição e posicionamento do ícone de editar
const EditIcon = styled(FaEdit)`
  display: inline-block;
  width: 1rem;
  height: 1rem;
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

// Edição e posicionamento do ícone de remover
const DeleteIcon = styled(FaTrash)`
  display: inline-block;
  width: 1rem;
  height: 1rem;
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
      await axios.put(
        `http://localhost:8800/administrador/${idAdm}/inactivate`
      );
      const newArray = adms.filter((adm) => adm.idAdm !== idAdm);
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

  // Função de confirmar a remoção do administrador
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
            <Th>Usuário</Th>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {adms.map((item, i) => (
            <Tr key={i}>
              <Td width="15%">{item.usuario}</Td>
              <Td width="20%">
                {item.nome} {item.sobrenome}
              </Td>
              <Td width="30%">{item.email}</Td>
              <Td width="15%">{item.telefone}</Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <EditIcon onClick={() => handleEdit(item)} />
                </IconContainer>
              </Td>
              <Td style={{ textAlign: "center" }} width="5%">
                <IconContainer>
                  <DeleteIcon onClick={() => openDeletePopup(item.idAdm)} />
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
