import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MovieListItem } from "../api/types";
import { getPosterURL } from "../common/imageGetter";
import BackdropImage from "./BackdropImage";
import SquareButton from "./SquareButton";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const InfoOverlay = styled.div`
  position: absolute;
  left: 5%;
  top: 30vh;
  width: 90%;
`;

const Title = styled.h1`
  width: 75%;
  font-size: 5vw;
  font-weight: 900;
  margin-bottom: 50px;
`;

const Description = styled.p`
  width: 50%;
  line-height: 1.5;
  margin-bottom: 100px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 90%;
  left: 5%;
  bottom: 25vh;
  display: flex;
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
        <Title>{movie.title}</Title>
        <Description>{movie.overview}</Description>
      </InfoOverlay>
      <ButtonContainer>
        <StyledLink to={`/movies/${movie.id}`}>
          <SquareButton size="big" bgColor="main">
            상세보기
          </SquareButton>
        </StyledLink>
      </ButtonContainer>
    </Container>
  );
}

export default RecommendedMovie;
