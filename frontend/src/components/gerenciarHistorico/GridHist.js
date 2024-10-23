import React from "react";
import styled from "styled-components";
import { FaEye, FaDownload } from "react-icons/fa";

// Estilização da tabela do Grid
const Table = styled.table`
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 0 0.25rem #ccc;
  border-radius: 0.25rem;
  margin: 1rem auto;
`;

export const Thead = styled.thead`
  background-color: #f8f9fa;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #dee2e6;
`;

export const Th = styled.th`
  text-align: start;
  padding: 0.5rem;
`;

export const Td = styled.td`
  padding: 0.75rem;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const GridHist = ({ pedidos }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Número Pedido</Th>
          <Th>Data</Th>
          <Th>Nome</Th>
          <Th>Valor</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pedidos.map((pedido) => (
          <Tr key={pedido.idPedido}>
            <Td width="20%">{pedido.idPedido}</Td>
            <Td width="20%">
              {new Date(pedido.dataPDF).toLocaleDateString()}
            </Td>
            <Td width="30%">{pedido.clienteNome}</Td>
            <Td width="15%" alignCenter>
              R$ {parseFloat(pedido.valorTotal).toFixed(2)}
            </Td>
            <Td style={{ textAlign: "center" }} width="5%">
              <FaEye style={{ cursor: "pointer", marginRight: "10px" }} title="Pré-visualizar PDF" />
              <FaDownload style={{ cursor: "pointer" }} title="Baixar PDF" />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default GridHist;
