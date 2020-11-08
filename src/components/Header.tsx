import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import useScroll from "../hooks/useScroll";

const Container = styled.header<{ transparent: boolean }>`
  position: fixed;
  z-index: 999;

  width: 100%;
  height: 60px;
  padding: 0 ${(props) => props.theme.paddings.side};

  display: flex;
  justify-content: space-between;

  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.main};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  transition: background-color 0.2s linear;
  will-change: background-color;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Icon = styled(Link)`
  margin-right: 19px;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Tab = styled(Link)<{ $isCurrent: boolean }>`
  text-decoration: none;
  color: inherit;

  width: 70px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 3px solid
    ${(props) =>
      props.$isCurrent ? props.theme.colors.highlight : "transparent"};

  &:not(:last-child) {
    margin-right: 10px;
  }

  transition: border-bottom 0.2s linear;
`;

const SearchForm = styled.form`
  width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 5px 15px;
  border-radius: 20px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  font: inherit;
  color: inherit;
`;

function Header() {
  const { pathname } = useLocation();
  const scroll = useScroll();
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push(`/search?term=${searchTerm}`);
    setSearchTerm("");
  };

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container transparent={scroll === 0}>
      <Column>
        <Icon to="/">
          <img src={require("../assets/nacho-icon.png")} alt="icon" />
        </Icon>
        <Tab to="/movies" $isCurrent={pathname.split("/")[1] === "movies"}>
          Movies
        </Tab>
        <Tab to="/tv" $isCurrent={pathname.split("/")[1] === "tv"}>
          TV
        </Tab>
      </Column>
      <Column>
        <SearchForm onSubmit={onSubmit}>
          <SearchInput
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder="작품 제목을 검색해보세요."
          />
        </SearchForm>
      </Column>
    </Container>
  );
}

export default Header;
