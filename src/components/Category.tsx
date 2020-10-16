import React from "react";
import styled from "styled-components";
import { CategoryList } from "../common/api";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
`;

type CategoryProps = {
  title: string;
  list: CategoryList;
};

function Category({ title, list }: CategoryProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Grid>
        {list.results.map((item) => (
          <span key={item.id}>{item.title}</span>
        ))}
      </Grid>
    </Container>
  );
}

export default Category;
