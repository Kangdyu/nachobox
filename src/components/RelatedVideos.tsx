import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

function RelatedVideos() {
  return (
    <Container>
      <Title>관련 영상</Title>
    </Container>
  );
}

export default RelatedVideos;
