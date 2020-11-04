import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header<{ isCurrent: boolean }>`
  position: fixed;
  z-index: 999;

  width: 100%;
  height: 60px;
  padding: 0 ${(props) => props.theme.paddings.side};

  display: flex;
  align-items: center;

  background-color: ${(props) =>
    props.isCurrent ? "transparent" : props.theme.colors.main};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  transition: background-color 0.2s linear;
`;

const Icon = styled(Link)`
  margin-right: 20px;

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

function Header() {
  const { pathname } = useLocation();

  return (
    <Container isCurrent={pathname === "/"}>
      <Icon to="/">
        <img src={require("../assets/nacho-icon.png")} alt="icon" />
      </Icon>
      <Tab to="/movies" $isCurrent={pathname === "/movies"}>
        Movies
      </Tab>
      <Tab to="/tv" $isCurrent={pathname === "/tv"}>
        TV
      </Tab>
      <Tab to="/search" $isCurrent={pathname === "/search"}>
        Search
      </Tab>
    </Container>
  );
}

export default Header;
