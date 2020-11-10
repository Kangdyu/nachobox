import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MovieListItem } from "../api/types";
import { getPosterURL } from "../common/imageGetter";
import BackdropImage from "./BackdropImage";
import SquareButton from "./SquareButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const InfoOverlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 50%;
  margin-left: 5%;
`;

const InfoRow = styled.div``;

const Title = styled.h1`
  width: 75%;
  font-size: 5vw;
  font-weight: 900;
  margin-bottom: 50px;
`;

const Description = styled.p`
  width: 50%;
  line-height: 1.5;
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
