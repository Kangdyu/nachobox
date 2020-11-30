import React from "react";
import styled, { css } from "styled-components";
import useScrollGrid from "hooks/useScrollGrid";
import { useGridSettings } from "components/common/GridSettingsProvider";

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
  font-weight: 700;
  cursor: pointer;
  z-index: 9;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
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

const Container = styled.div`
  position: relative;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 50px;
  }

  &:hover ${ScrollButton} {
    opacity: 1;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    ${ScrollButton} {
      opacity: 1;
    }
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
  title?: string;
  columnWidth?: number;
  gap?: number;
  scrollRatio?: number;
  listLength: number;
  children: React.ReactNode;
};

function ScrollGrid({
  title,
  columnWidth,
  gap,
  scrollRatio,
  listLength,
  children,
}: ScrollGridProps) {
  const {
    columnWidth: defaultWidth,
    gap: defaultGap,
    scrollRatio: defaultScrollRatio,
  } = useGridSettings();

  if (!columnWidth) columnWidth = defaultWidth;
  if (!gap) gap = defaultGap;
  if (!scrollRatio) scrollRatio = defaultScrollRatio;

  const { scroll, gridRef, onScrollLeft, onScrollRight } = useScrollGrid({
    scrollRatio,
    gridInfo: {
      columnWidth,
      gap,
      listLength: listLength,
    },
  });

  return (
    <>
      {title && <Title>{title}</Title>}
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
          <i className="fas fa-chevron-left"></i>
        </ScrollButton>
        <ScrollButton
          direction="right"
          onClick={onScrollRight}
          visible={!scroll.isRightEnd}
        >
          <i className="fas fa-chevron-right"></i>
        </ScrollButton>
      </Container>
    </>
  );
}

export default ScrollGrid;
