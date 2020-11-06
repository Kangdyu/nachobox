import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

function Recommendations() {
  return (
    <Container>
      <Title>추천 영화</Title>
    </Container>
  );
}

export default Recommendations;
