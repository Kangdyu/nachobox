import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - ${(props) => props.theme.footerHeight});

  display: flex;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return <Container>Loading...</Container>;
}

export default Loading;
