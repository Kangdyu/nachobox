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

const Description = styled.p`
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.highlight};
`;

type ErrorPageProps = {
  message: string;
};

function ErrorPage({ message }: ErrorPageProps) {
  return (
    <Container>
      <Helmet>
        <title>Error | NachoBox</title>
      </Helmet>
      <Title>오류가 발생했습니다 {":("}</Title>
      <Description>{message}</Description>
      <StyledLink to="/">← 홈으로 가기</StyledLink>
    </Container>
  );
}

export default ErrorPage;
