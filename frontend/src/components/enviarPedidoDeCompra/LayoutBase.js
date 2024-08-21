import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 90px;
  background-color: #2c73d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Button = styled.button`
  padding: 15px 70px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid blue;
  background-color: #fff;
  color: #2c73d2;
  font-weight: bold;
  font-size: 20px;
  height: 70px;
  z-index: 2;
  margin-right: 20px;
`;

const PositionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  position: absolute;
  right: 40px;
`;

const TotalText = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
`;

const LayoutBase = ({ produtos }) => {
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        if (produtos.length > 0) {
          const response = await axios.get('http://localhost:8800/carrinho/cotacao');
          setValorTotal(response.data.total);
        } else {
          setValorTotal(0);
        }
      } catch (error) {
        console.error("Erro ao buscar cotação:", error);
      }
    };

    fetchTotal();
  }, [produtos]);

  return (
    <Container>
      <TotalText>Valor Total: R$ {valorTotal.toFixed(2)}</TotalText>
      <PositionContainer>
        <Button>Gerar Pedido de Compra</Button>
      </PositionContainer>
    </Container>
  );
};

export default LayoutBase;
