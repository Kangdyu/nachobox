import React from "react";
import styled from "styled-components";
import ScrollGrid from "./ScrollGrid";

const Container = styled.div`
  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    font-size: 1.3rem;
  }
`;

type ScrollGridCategoryProps = {
  title: string;
  columnWidth: number;
  gap: number;
  scrollRatio: number;
  listLength: number;
  children: React.ReactNode;
};

function ScrollGridCategory({
  title,
  columnWidth,
  gap,
  scrollRatio,
  listLength,
  children,
}: ScrollGridCategoryProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <ScrollGrid
        columnWidth={columnWidth}
        gap={gap}
        scrollRatio={scrollRatio}
        listLength={listLength}
      >
        {children}
      </ScrollGrid>
    </Container>
  );
}

export default ScrollGridCategory;
