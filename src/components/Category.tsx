import React from "react";
import styled from "styled-components";
import { CategoryList } from "../common/api";
import CategoryItem from "./CategoryItem";

const Container = styled.section`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Grid = styled.div<{ width: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${({ width }) => width});
  gap: 15px;
`;

type CategoryProps = {
  title: string;
  list: CategoryList;
  gridWidth: string;
};

function Category({ title, list, gridWidth }: CategoryProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid width={gridWidth}>
        {list.results.map((item) => (
          <CategoryItem
            key={item.id}
            posterURL={
              item.poster_path
                ? "https://image.tmdb.org/t/p/w500/" + item.poster_path
                : require("../assets/nacho-icon.png")
            }
            width={gridWidth}
            title={item.title}
            year={item.release_date.split("-")[0]}
            rating={item.vote_average}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default Category;
