import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: calc(100vh - ${(props) => props.theme.footerHeight});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.highlight};
`;

function PageNotFound() {
  return (
    <Container>
      <Helmet>
        <title>404 | NachoBox</title>
      </Helmet>
      <Title>페이지를 찾을 수 없습니다.</Title>
      <StyledLink to="/">← 홈으로 가기</StyledLink>
    </Container>
  );
}

export default PageNotFound;
