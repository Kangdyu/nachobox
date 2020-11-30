import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const slideIn = keyframes`
  0% {
    transform: translateY(-60px);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-60px);
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

const Form = styled.form<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${(props) => props.theme.headerHeight};
  transform: translateY(-60px);

  animation-name: ${slideIn};
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;

  ${({ visible }) =>
    !visible &&
    css`
      animation-name: ${slideOut};
    `}

  i {
    position: absolute;
    font-size: 1.5rem;
    top: 17px;
    left: 15px;
    color: white;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 55px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.main} !important;
  box-shadow: none !important;
  font: inherit;
  color: inherit;
`;

type MobileSearchFormProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileSearchForm({ visible, setVisible }: MobileSearchFormProps) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  useEffect(() => {
    if (localVisible) {
      searchInputRef.current?.focus();
    }
  }, [localVisible]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push(`/search?term=${searchTerm}`);
    setSearchTerm("");
    setVisible(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (!animate && !localVisible) return null;
  return (
    <>
      <DarkBackground visible={visible} onClick={() => setVisible(false)} />
      <Form visible={visible} onSubmit={onSubmit}>
        <i className="fas fa-search"></i>
        <Input
          ref={searchInputRef}
          value={searchTerm}
          onChange={onChange}
          placeholder="작품 제목을 검색해보세요."
        />
      </Form>
    </>
  );
}

export default MobileSearchForm;
