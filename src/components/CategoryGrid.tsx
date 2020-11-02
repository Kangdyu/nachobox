import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
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
  list: [];
  gridWidth: number;
  gridGap: number;
};

function CategoryGrid({ list, gridWidth, gridGap }: CategoryGridProps) {
  const [scroll, setScroll] = useState(0);
  const [isLeftEnd, setIsLeftEnd] = useState(true);
  const [isRightEnd, setIsRightEnd] = useState(false);
  const gridRef = useRef() as React.RefObject<HTMLDivElement>;

  const scrollAmount = (gridWidth + gridGap) * 3;

  const onScrollLeft = () => {
    if (scroll > -scrollAmount) {
      setScroll(0);
      setIsLeftEnd(true);
    } else {
      setScroll(scroll + scrollAmount);
      if (scroll + scrollAmount === 0) {
        setIsLeftEnd(true);
      }
    }
    setIsRightEnd(false);
  };
  const onScrollRight = () => {
    if (!gridRef.current) {
      return;
    }

    const containerWidth = gridRef.current.clientWidth;
    const maxScrollLimit = -(
      list.length * (gridWidth + gridGap) -
      containerWidth -
      gridGap
    );

    if (scroll - scrollAmount < maxScrollLimit) {
      setScroll(maxScrollLimit);
      setIsRightEnd(true);
    } else {
      setScroll(scroll - scrollAmount);
      if (scroll - scrollAmount === maxScrollLimit) {
        setIsRightEnd(true);
      }
    }
    setIsLeftEnd(false);
  };

  return (
    <Container>
      <Grid ref={gridRef} width={gridWidth} gap={gridGap} scroll={scroll}>
        {list.map((item) => (
          <CategoryItem
            key={item.id}
            posterURL={
              item.poster_path
                ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                : require("../assets/nacho-icon.png")
            }
            width={gridWidth}
            title={item.title ? item.title : item.name}
            releaseDate={
              item.release_date ? item.release_date : item.first_air_date
            }
            rating={item.vote_average}
          />
        ))}
      </Grid>
      <ScrollButton
        direction="left"
        onClick={onScrollLeft}
        visible={!isLeftEnd}
      >
        &lt;
      </ScrollButton>
      <ScrollButton
        direction="right"
        onClick={onScrollRight}
        visible={!isRightEnd}
      >
        &gt;
      </ScrollButton>
    </Container>
  );
}

export default CategoryGrid;
