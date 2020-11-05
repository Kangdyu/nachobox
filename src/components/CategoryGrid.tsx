import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { MovieListItem, TVListItem } from "../api/types";
import getImageURL from "../common/getImageURL";
import { isMovieListItem } from "../common/typeGuards";
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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
          <StyledLink
            key={item.id}
            to={isMovieListItem(item) ? `/movies/${item.id}` : `/tv/${item.id}`}
          >
            <CategoryItem
              width={gridWidth}
              rating={item.vote_average}
              posterURL={
                item.poster_path
                  ? getImageURL(item.poster_path, "w500")
                  : require("../assets/nacho-icon.png")
              }
              title={isMovieListItem(item) ? item.title : item.name}
              releaseDate={
                isMovieListItem(item) ? item.release_date : item.first_air_date
              }
            />
          </StyledLink>
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
