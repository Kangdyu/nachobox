import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.header`
  position: fixed;
  z-index: 999;

  width: 100%;
  height: 60px;
  padding: 0 ${(props) => props.theme.paddings.side};

  display: flex;
  align-items: center;

  background-color: ${(props) => props.theme.colors.main};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Icon = styled(Link)`
  margin-right: 20px;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Tab = styled(Link)<{ current: string }>`
  text-decoration: none;
  color: inherit;

  width: 70px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 3px solid
    ${(props) =>
      props.current === props.to
        ? props.theme.colors.highlight
        : "transparent"};

  &:not(:last-child) {
    margin-right: 10px;
  }

  transition: border-bottom 0.2s linear;
`;

function Header() {
  const { pathname } = useLocation();

  return (
    <Container>
      <Icon to="/">
        <img src={require("../assets/nacho-icon.png")} alt="icon" />
      </Icon>
      <Tab to="/movies" current={pathname}>
        Movies
      </Tab>
      <Tab to="/tv" current={pathname}>
        TV
      </Tab>
      <Tab to="/search" current={pathname}>
        Search
      </Tab>
    </Container>
  );
}

export default Header;
