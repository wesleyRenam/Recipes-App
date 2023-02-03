import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  html {
    width: 100vw;
    height: 100vh;
  }
`;

export default GlobalStyle;
