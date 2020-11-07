import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Overlay = styled.div``;

const PosterContainer = styled.div`
  position: relative;
  margin-bottom: 5px;

  &:hover {
    ${Overlay} {
      div {
        opacity: 1;
      }
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 1rem;
  padding: 5px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Subtitle = styled.h3`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray};
`;

type GridItemProps = {
  title: string;
  subtitle: string;
  image: string;
  children?: React.ReactNode;
};

function GridItem({ title, subtitle, image, children }: GridItemProps) {
  return (
    <Container>
      <PosterContainer>
        <Poster src={image} />
        <Overlay>{children}</Overlay>
      </PosterContainer>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}

export default GridItem;
