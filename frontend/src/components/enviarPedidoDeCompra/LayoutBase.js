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
  height: 5.625rem;
  background-color: #2c73d2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  left: 0;
`;

const Button = styled.button`
  padding: 0.9375rem 4.375rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  border: 0.0625rem solid blue;
  background-color: #fff;
  color: #2c73d2;
  font-weight: bold;
  font-size: 1.25rem;
  height: 4.375rem;
  z-index: 2;
  margin-right: 1.25rem;
`;

const PositionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  position: absolute;
  right: 2.5rem;
`;

const TotalText = styled.span`
  font-size: 2rem;
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
  padding: 2.5rem 1.25rem 1.25rem;
  border-radius: 0.5rem;
  position: relative;
  width: 60%;
  max-width: 43.75rem;
  height: 60%;
  max-height: 43.75rem;
  overflow-y: auto;
`;

const CloseButton = styled(VscClose)`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Centraliza os botões horizontalmente
  gap: 0.625rem; // Espaço entre os botões
  margin-top: 1.25rem; // Espaço acima dos botões
`;

const StyledButton = styled.button`
  background-color: #2c73d2;
  color: white;
  border: none;
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.3125rem;
  margin: 0 0.3125rem;

  &:hover {
    background-color: #1a5bb8; // Cor de fundo ao passar o mouse
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
          <StyledButton onClick={onSend}>Enviar Pedido de Compra</StyledButton>
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
    const produtosResponse = await axios.get(
      "http://localhost:8800/carrinho/produtos"
    );
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
    const cotacaoResponse = await axios.get(
      "http://localhost:8800/carrinho/cotacao"
    );
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

      await axios.post("http://localhost:8800/cliente/enviarPedido", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Email enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
      toast.error("Erro ao enviar o email.");
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