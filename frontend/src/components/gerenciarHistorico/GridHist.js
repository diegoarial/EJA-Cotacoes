import React from "react";
import styled from "styled-components";

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
`;

export const Td = styled.td`
  padding-top: 0.9375rem;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 31.25rem) {
    ${(props) => props.onlyweb && "display: none"}
`;

// Funções da tabela de dados
const GridHist = () => {

  // Organização do grid
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Número Pedido</Th>            
            <Th>Data</Th>
            <Th>Nome</Th>
            <Th>Valor</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
            <Tr>
              <Td width="20%"></Td>
              <Td width="20%"></Td>
              <Td width="30%"></Td>
              <Td width="15%"></Td>
              <Td style={{ textAlign: "center" }} width="5%">
              </Td>
            </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default GridHist;


