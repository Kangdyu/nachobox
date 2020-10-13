import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.colors.main};
`;

function Home() {
  return <Container>Home</Container>;
}

export default Home;
