import styled, { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    color: white;
  }

  * {
    box-sizing: border-box;
  }
`;

export const theme: DefaultTheme = {
  paddings: {
    containerTop: "100px",
    side: "30px",
  },
  colors: {
    main: "#222831",
    secondary: "#393e46",
    highlight: "#fddb3a",
  },
};

export const MainContainer = styled.div`
  min-height: 100vh;
  padding: 0 ${(props) => props.theme.paddings.side};
  padding-top: ${(props) => props.theme.paddings.containerTop};
  background-color: ${(props) => props.theme.colors.main};
`;
