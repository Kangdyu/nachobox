import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  0% {
    transform: translateX(-250px);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-250px);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const DarkBackground = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  animation-name: ${fadeIn};
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  ${({ visible }) =>
    !visible &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.main};

  animation-name: ${slideIn};
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  ${({ visible }) =>
    !visible &&
    css`
      animation-name: ${slideOut};
    `}
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: ${(props) => props.theme.headerHeight};
  border-bottom: 3px solid ${(props) => props.theme.colors.secondary};
  font-size: 1.2rem;
  font-weight: 900;
`;

const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Item = styled.div<{ isCurrent: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  border-bottom: 1px solid ${(props) => props.theme.colors.secondary};

  background-color: ${({ isCurrent, theme }) =>
    isCurrent ? theme.colors.highlight : "transparent"};
  color: ${({ isCurrent, theme }) => (isCurrent ? theme.colors.main : "white")};

  i {
    width: 30px;
    margin-right: 15px;
  }
`;

type HamburgerMenuProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function HamburgerMenu({ visible, setVisible }: HamburgerMenuProps) {
  const { pathname } = useLocation();
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  if (!animate && !localVisible) return null;

  return (
    <>
      <DarkBackground onClick={() => setVisible(false)} visible={visible} />
      <Container visible={visible}>
        <Header>NachoBox</Header>
        <Menu>
          <StyledLink to="/" onClick={() => setVisible(false)}>
            <Item isCurrent={pathname === "/"}>
              <i className="fas fa-home"></i>홈
            </Item>
          </StyledLink>
          <StyledLink to="/movies" onClick={() => setVisible(false)}>
            <Item isCurrent={pathname.split("/")[1] === "movies"}>
              <i className="fas fa-film"></i>영화
            </Item>
          </StyledLink>
          <StyledLink to="/tv" onClick={() => setVisible(false)}>
            <Item isCurrent={pathname.split("/")[1] === "tv"}>
              <i className="fas fa-tv"></i>TV 프로그램
            </Item>
          </StyledLink>
        </Menu>
      </Container>
    </>
  );
}

export default HamburgerMenu;
