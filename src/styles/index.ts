import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
  }

  #root {
    height: 100vh;
  }
`;

export const theme: DefaultTheme = {
  colors: {
    main: "#41444b",
    secondary: "#52575d",
    highlight: "#fddb3a"
  }
}