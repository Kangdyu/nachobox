import React from "react";
import { ThemeProvider } from "styled-components";
import AppRouter from "AppRouter";
import { GridSettingsProvider } from "components/common/GridSettingsProvider";
import { GlobalStyle, theme } from "styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GridSettingsProvider>
        <GlobalStyle />
        <AppRouter />
      </GridSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
