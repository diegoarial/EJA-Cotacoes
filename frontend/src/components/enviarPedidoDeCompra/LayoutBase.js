import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import FormCart from "./FormCart";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 60%;
  max-width: 600px;
  height: 60%;
  max-height: 600px;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

const PreviewModal = ({ pdfBlob, onClose }) => {
  if (!pdfBlob) return null;

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
        <iframe
          title="Pré-visualização do Pedido de Compra"
          src={URL.createObjectURL(pdfBlob)}
          style={{ width: "100%", height: "500px", border: "none" }}
        />

        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(pdfBlob);
            link.download = "pedido_de_compra.pdf";
            link.click();
          }}
          style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        >
          Baixar Pedido de Compra
        </button>
      </ModalContent>
    </ModalContainer>
  );
};

const LayoutBase = () => {
  const [cotacaoFinal, setCotacaoFinal] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [setCartData] = useState([]); // Corrigido para utilizar

  // Função para buscar a cotação e dados do carrinho
  const fetchCotacao = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/carrinho/cotacao"
      );
      setCotacaoFinal(response.data.cotacaoFinal);
      setCartData(response.data.cartItems); // Supondo que cartItems seja a lista de produtos no carrinho
    } catch (error) {
      console.error("Erro ao buscar a cotação:", error);
    }
  }, [setCartData]); // Incluído setCartData

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
    const response = await axios.get("http://localhost:8800/carrinho/produtos");
    const produtos = response.data;

    // Gerar o PDF com os dados do carrinho
    const doc = new jsPDF();
    doc.text("Pedido de Compra", 20, 10);

    // Usar jsPDF-AutoTable para criar a tabela
    doc.autoTable({
      head: [["Título", "Preço Unitário", "Quantidade", "Preço Total"]],
      body: produtos.map((produto) => [
        produto.titulo,
        `R$ ${produto.precoVenda.toFixed(2)}`,
        produto.quantidade,
        `R$ ${produto.precoTotal.toFixed(2)}`,
      ]),
    });

    // Adicionar o valor total ao PDF
    const cotacaoResponse = await axios.get(
      "http://localhost:8800/carrinho/cotacao"
    );
    const cotacaoFinal = cotacaoResponse.data.cotacaoFinal || 0;
    doc.text(`Valor Total: R$ ${cotacaoFinal.toFixed(2)}`, 20, 270);

    // Converter PDF para blob e armazenar
    const pdfBlob = doc.output("blob");
    setPdfBlob(pdfBlob);
    handleClosePopup();
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

      <PreviewModal pdfBlob={pdfBlob} onClose={() => setPdfBlob(null)} />
    </Container>
  );
};

export default LayoutBase;
