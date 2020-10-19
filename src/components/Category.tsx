import React from "react";
import styled from "styled-components";
import { CategoryList } from "../common/api";
import CategoryGrid from "./CategoryGrid";

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

type CategoryProps = {
  title: string;
  list: CategoryList;
  gridWidth: number;
  gridGap: number;
};

function Category({ title, list, gridWidth, gridGap }: CategoryProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <CategoryGrid list={list} gridWidth={gridWidth} gridGap={gridGap} />
    </Container>
  );
}

export default Category;
