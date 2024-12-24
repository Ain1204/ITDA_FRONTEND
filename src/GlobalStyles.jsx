import { createGlobalStyle } from 'styled-components';
import SUITVariable from './assets/font/SUIT-Variable.ttf';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'SUIT';
    src: url(${SUITVariable}) format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'SUIT', sans-serif;
    font-size: 16px;
  }

  body {
    font-family: 'SUIT', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // button {
  //   background: none;
  //   border: none;
  //   padding: 0;
  //   cursor: pointer;
  //   font-family: 'SUIT', sans-serif;
  // }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
  border: none;
  outline: none;
  font-family: 'SUIT', sans-serif;
  }

  ul, ol, li {
  list-style: none;
  }
`;

export default GlobalStyles;
