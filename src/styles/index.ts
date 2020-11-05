import styled, { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    color: white;
    overflow-x: hidden;
    background-color: ${(props) => props.theme.colors.main};
  }

  * {
    box-sizing: border-box;
  }
`;

export const theme: DefaultTheme = {
  footerHeight: "100px",
  paddings: {
    containerTop: "100px",
    containerBottom: "100px",
    side: "30px",
  },
  colors: {
    main: "#222831",
    secondary: "#393e46",
    highlight: "#fddb3a",
    black: "#1e1e1e",
    gray: "#495057",
    white: "#fbfbf9",
  },
};

export const MainContainer = styled.div`
  /* min-height: calc(100vh - ${(props) => props.theme.footerHeight}); */
  max-width: 1765px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.paddings.side};
  padding-top: ${(props) => props.theme.paddings.containerTop};
  padding-bottom: ${(props) => props.theme.paddings.containerBottom};
`;
