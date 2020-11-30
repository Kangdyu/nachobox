import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: calc(100vh - ${(props) => props.theme.footerHeight});

  display: flex;
  justify-content: center;
  align-items: center;
`;

const circleRotateAnimation = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const strokeOffsetAnimation = keyframes`
  0% {
    stroke-dashoffset: 0
  }
  75% {
    stroke-dashoffset: -240
  }
  100% {
    stroke-dashoffset: -251
  }
`;

const LoadingCircle = styled.svg`
  width: 90px;
  height: 90px;
  animation: ${circleRotateAnimation} 2s infinite;

  circle {
    stroke: ${({ theme }) => theme.colors.highlight};
    stroke-width: 10;
    fill: none;

    animation: ${strokeOffsetAnimation} 1s infinite;
  }
`;

function Loading() {
  return (
    <Container>
      <LoadingCircle strokeDasharray={251}>
        <circle cx="50%" cy="50%" r="40"></circle>
      </LoadingCircle>
    </Container>
  );
}

export default Loading;
