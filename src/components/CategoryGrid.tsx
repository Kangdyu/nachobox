import React from "react";
import styled, { css } from "styled-components";
import { MovieListItem, TVListItem } from "../api/types";
import { isMovieItem } from "../common/typeGuards";
import useScrollGrid from "../hooks/useScrollGrid";
import CategoryItem from "./CategoryItem";

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

const Grid = styled.div<{ width: number; gap: number; scroll: number }>`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ width }) => width + "px"};
  gap: ${({ gap }) => gap + "px"};

  transform: translateX(${({ scroll }) => scroll + "px"});
  transition: transform 0.5s ease-in-out;
`;

type CategoryGridProps = {
  list: (MovieListItem | TVListItem)[];
  gridWidth: number;
  gridGap: number;
};

function CategoryGrid({ list, gridWidth, gridGap }: CategoryGridProps) {
  const { scroll, gridRef, onScrollLeft, onScrollRight } = useScrollGrid({
    scrollRatio: 2,
    gridInfo: {
      gridWidth,
      gridGap,
      gridListLength: list.length,
    },
  });

  return (
    <Container>
      <Grid
        ref={gridRef}
        width={gridWidth}
        gap={gridGap}
        scroll={scroll.amount}
      >
        {list.map((item) => (
          <CategoryItem
            key={item.id}
            width={gridWidth}
            rating={item.vote_average}
            posterURL={
              item.poster_path
                ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                : require("../assets/nacho-icon.png")
            }
            title={isMovieItem(item) ? item.title : item.name}
            releaseDate={
              isMovieItem(item) ? item.release_date : item.first_air_date
            }
          />
        ))}
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

export default CategoryGrid;
