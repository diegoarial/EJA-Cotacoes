import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

body {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #f2f2f2;
}

/* Ocultar o cursor de texto em elementos não interativos */
:not(input):not(textarea):not([contenteditable]) {
    caret-color: transparent;
}

input, textarea {
    caret-color: initial;
}
`;

export default Global;
