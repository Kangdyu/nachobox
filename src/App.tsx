import React from "react";
import { ThemeProvider } from "styled-components";
import AppRouter from "./AppRouter";
import Footer from "./components/Footer";
import { GlobalStyle, theme } from "./styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
