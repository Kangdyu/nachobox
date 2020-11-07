import React from "react";
import styled, { css } from "styled-components";
import useScrollGrid from "../hooks/useScrollGrid";

const ScrollButton = styled.button<{
  direction: "left" | "right";
  visible: boolean;
}>`
  position: absolute;
  top: 0;
  ${({ direction }) =>
    direction === "left"
      ? css`
          left: 0px;
        `
      : css`
          right: 0px;
        `}
  width: 50px;
  height: 100%;
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 2rem;
  color: white;
  font-weight: 800;
  cursor: pointer;
  z-index: 9;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;

const Container = styled.div`
  position: relative;
  overflow: hidden;

  &:hover ${ScrollButton} {
    opacity: 1;
  }
`;

const Grid = styled.div<{ columnWidth: number; gap: number; scroll: number }>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ columnWidth }) => columnWidth + "px"};
  gap: ${({ gap }) => gap + "px"};

  transform: translateX(${({ scroll }) => scroll + "px"});
  transition: transform 0.5s ease-in-out;
`;

type ScrollGridProps = {
  scrollRatio: number;
  columnWidth: number;
  gap: number;
  listLength: number;
  children: React.ReactNode;
};

function ScrollGrid({
  scrollRatio,
  columnWidth,
  gap,
  listLength,
  children,
}: ScrollGridProps) {
  const { scroll, gridRef, onScrollLeft, onScrollRight } = useScrollGrid({
    scrollRatio,
    gridInfo: {
      columnWidth,
      gap,
      listLength: listLength,
    },
  });

  return (
    <Container>
      <Grid
        ref={gridRef}
        columnWidth={columnWidth}
        gap={gap}
        scroll={scroll.amount}
      >
        {children}
      </Grid>
      <ScrollButton
        direction="left"
        onClick={onScrollLeft}
        visible={!scroll.isLeftEnd}
      >
        &lt;
      </ScrollButton>
      <ScrollButton
        direction="right"
        onClick={onScrollRight}
        visible={!scroll.isRightEnd}
      >
        &gt;
      </ScrollButton>
    </Container>
  );
}

export default ScrollGrid;
