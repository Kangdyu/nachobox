import React, { useLayoutEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

import useScrollAlert from "hooks/useScrollAlert";

import HamburgerMenu from "components/header/HamburgerMenu";
import MobileSearchForm from "components/header/MobileSearchForm";

const Container = styled.header<{ transparent: boolean }>`
  position: fixed;
  z-index: 999;

  width: 100%;
  height: ${(props) => props.theme.headerHeight};
  padding: 0 ${(props) => props.theme.paddings.side};

  display: flex;
  justify-content: space-between;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.main};
  ${({ transparent, theme }) =>
    transparent &&
    css`
      & input {
        background-color: transparent;
        box-shadow: 0 0 0 1px ${theme.colors.gray} inset;

        &::placeholder {
          color: ${theme.colors.gray};
        }
      }
    `}

  transition: background-color 0.2s linear;
  will-change: background-color;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const HamburgerButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  margin-right: 20px;
  display: none;

  i {
    font-size: 1.2rem;
    color: white;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    display: block;
  }
`;

const Icon = styled(Link)`
  margin-right: 19px;

  img {
    width: 50px;
    height: 50px;
  }
`;

const Tab = styled(Link)<{ $isCurrent: boolean }>`
  display: block;
  text-decoration: none;
  color: inherit;

  width: 100px;
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

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    display: none;
  }
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  i {
    font-size: 1.2rem;
    color: white;
  }

  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

const SearchForm = styled.form`
  display: block;
  position: relative;
  width: 400px;

  i {
    position: absolute;
    left: 15px;
    top: 10px;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 5px 15px;
  padding-left: 40px;
  border-radius: 20px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.secondary};
  font: inherit;
  color: inherit;

  transition-property: background-color box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: linear;

  &::placeholder {
    transition: color 0.2s linear;
  }
`;

function Header() {
  const { pathname } = useLocation();
  const scrollAlert = useScrollAlert(0);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [searchFormOnMobile, setSearchFormOnMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useLayoutEffect(() => {
    if (history.action === "PUSH") {
      window.scrollTo(0, 0);
    }
  }, [history.action]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push(`/search?term=${searchTerm}`);
    setSearchTerm("");
  };

  const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container transparent={scrollAlert}>
      <Column>
        <HamburgerButton onClick={() => setHamburgerMenu(true)}>
          <i className="fas fa-bars"></i>
        </HamburgerButton>
        <Icon to="/">
          <img src={require("assets/nacho-icon.png")} alt="icon" />
        </Icon>
        <Tab to="/movies" $isCurrent={pathname.split("/")[1] === "movies"}>
          영화
        </Tab>
        <Tab to="/tv" $isCurrent={pathname.split("/")[1] === "tv"}>
          TV 프로그램
        </Tab>
      </Column>
      <Column>
        <SearchButton onClick={() => setSearchFormOnMobile(true)}>
          <i className="fas fa-search"></i>
        </SearchButton>
        <SearchForm onSubmit={onSubmit}>
          <i className="fas fa-search"></i>
          <SearchInput
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder="작품 제목을 검색해보세요."
          />
        </SearchForm>
      </Column>
      <HamburgerMenu visible={hamburgerMenu} setVisible={setHamburgerMenu} />
      <MobileSearchForm
        visible={searchFormOnMobile}
        setVisible={setSearchFormOnMobile}
      />
    </Container>
  );
}

export default Header;
