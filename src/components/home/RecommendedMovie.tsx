import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { MovieListItem } from "api/types";

import { getPosterURL } from "utils/imageGetter";

import BackdropImage from "components/common/BackdropImage";
import SquareButton from "components/common/SquareButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    justify-content: center;
  }
`;

const InfoOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 50%;
  margin-left: 5%;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
    margin-left: 50px;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    margin-left: 0;
    justify-content: center;
  }
`;

const InfoRow = styled.div`
  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 15px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
    font-size: 1.1rem;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    font-size: 1rem;
  }
`;

const Title = styled.h1`
  width: 75%;
  font-size: 5vw;
  font-weight: 900;
  margin-bottom: 50px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
    width: 90%;
    font-size: 3rem;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    text-align: center;
    width: 90%;
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  width: 50%;
  line-height: 1.5;
  margin-bottom: 20px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    width: 60%;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
    width: 80%;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.mobile}) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

type RecommendedMovieProps = {
  movie: MovieListItem;
};

function RecommendedMovie({ movie }: RecommendedMovieProps) {
  return (
    <Container>
      {movie.backdrop_path && (
        <BackdropImage image={getPosterURL(movie.backdrop_path, "original")} />
      )}
      <InfoOverlay>
        <InfoRow>
          <Subtitle>현재 상영 중</Subtitle>
          <Title>{movie.title}</Title>
          <Description>{movie.overview}</Description>
        </InfoRow>
        <InfoRow>
          <StyledLink to={`/movies/${movie.id}`}>
            <SquareButton size="big">상세보기</SquareButton>
          </StyledLink>
        </InfoRow>
      </InfoOverlay>
    </Container>
  );
}

export default RecommendedMovie;
