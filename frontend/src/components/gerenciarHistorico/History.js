import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../../styles/global";
import LayoutHist from "./LayoutHist";
import GridHist from "./GridHist";

// Estilização da página
const Container = styled.div`
  width: 100%;
  max-width: 50rem;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

function History() {

  // Organização da página
  return (
    <>
      <LayoutHist />
      <Container>
        <GridHist/>
      </Container>
      <GlobalStyle />
    </>
  );
}

export default History;