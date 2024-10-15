import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import FormCart from "./FormCart";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { VscClose } from "react-icons/vsc";


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

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 40px 20px 20px;
  border-radius: 8px;
  position: relative;
  width: 60%;
  max-width: 700px;
  height: 60%;
  max-height: 700px;
  overflow-y: auto;
`;

const CloseButton = styled(VscClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;  // Centraliza os botões horizontalmente
  gap: 10px;  // Espaço entre os botões
  margin-top: 20px;  // Espaço acima dos botões
`;

const StyledButton = styled.button`
  background-color: #2c73d2;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
  
  &:hover {
    background-color: #1a5bb8;  // Cor de fundo ao passar o mouse
  }
`;

const PreviewModal = ({ pdfBlob, onClose, onSend }) => {
  if (!pdfBlob) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose} />
        <iframe
          title="Pré-visualização do Pedido de Compra"
          src={URL.createObjectURL(pdfBlob)}
          style={{ width: "100%", height: "500px", border: "none" }}
        />
        <ButtonContainer>
          <StyledButton
            onClick={() => {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(pdfBlob);
              link.download = "pedido_de_compra.pdf";
              link.click();
            }}
          >
            Baixar Pedido de Compra
          </StyledButton>
          <StyledButton onClick={onSend}>
            Enviar Pedido de Compra
          </StyledButton>
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

const LayoutBase = () => {
  const [cotacaoFinal, setCotacaoFinal] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [setCartData] = useState([]);

  // Função para buscar a cotação e dados do carrinho
  const fetchCotacao = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/carrinho/cotacao"
      );
      setCotacaoFinal(response.data.cotacaoFinal);
      setCartData(response.data.cartItems);
    } catch (error) {
      console.error("Erro ao buscar a cotação:", error);
    }
  }, [setCartData]);

  useEffect(() => {
    fetchCotacao();
  }, [fetchCotacao]);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = async (formData) => {
    // Salvar os dados do cliente
    await axios.post("http://localhost:8800/cliente/", formData);
    toast.success("Cliente salvo com sucesso!");
  
    // Buscar os dados do carrinho
    const produtosResponse = await axios.get("http://localhost:8800/carrinho/produtos");
    const produtos = produtosResponse.data;
  
    // Criar o PDF
    const doc = new jsPDF();

    doc.setFontSize(24); 
    doc.text("Pedido de Compra", 20, 10);

    doc.setFontSize(14);

    // Adicionar os dados do cliente ao PDF
    doc.text(`Cliente: ${formData.nome} ${formData.sobrenome}`, 20, 20);
    doc.text(`Telefone: ${formData.telefone}`, 100, 20);
    doc.text(`Empresa: ${formData.empresa}`, 20, 30);
  
    // Usar jsPDF-AutoTable para criar a tabela
    doc.autoTable({
      startY: 40, // Iniciar a tabela abaixo dos dados do cliente
      head: [["Título", "Preço Unitário", "Quantidade", "Preço Total"]],
      body: produtos.map((produto) => [
        produto.titulo,
        `R$ ${produto.precoVenda.toFixed(2)}`,
        produto.quantidade,
        `R$ ${produto.precoTotal.toFixed(2)}`,
      ]),
    });
  
    // Adicionar o valor total ao PDF no fim da página
    const cotacaoResponse = await axios.get("http://localhost:8800/carrinho/cotacao");
    const cotacaoFinal = cotacaoResponse.data.cotacaoFinal || 0;
    const finalY = doc.autoTable.previous.finalY || 40;
    doc.setFontSize(20);
    doc.text(`Valor Total: R$ ${cotacaoFinal.toFixed(2)}`, 20, finalY + 20);
  
    // Converter PDF para blob e armazenar
    const pdfBlob = doc.output("blob");
    setPdfBlob(pdfBlob);
    handleClosePopup();
  };
  
  const handleSendEmail = async () => {
    try {
      const formData = new FormData();
      formData.append("pedidoPDF", pdfBlob);
  
      await axios.post('http://localhost:8800/cliente/enviarPedido', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      toast.error('Erro ao enviar o email.');
    }
  };

  return (
    <Container>
      <TotalText>Valor Total: R$ {cotacaoFinal.toFixed(2)}</TotalText>
      <PositionContainer>
        <Button onClick={handleOpenPopup}>Gerar Pedido de Compra</Button>
      </PositionContainer>

      {isPopupOpen && (
        <FormCart onSave={handleSave} onClose={handleClosePopup} />
      )}

      <PreviewModal
        pdfBlob={pdfBlob}
        onClose={() => setPdfBlob(null)}
        onSend={handleSendEmail}
      />
    </Container>
  );
};

export default LayoutBase;
