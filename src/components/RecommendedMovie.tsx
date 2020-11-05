import React from "react";
import styled from "styled-components";
import { MovieListItem } from "../api/types";
import getImageURL from "../common/getImageURL";
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
  justify-content: space-between;
`;

const ButtonColumn = styled.div`
  button {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

type RecommendedMovieProps = {
  movie: MovieListItem;
};

function RecommendedMovie({ movie }: RecommendedMovieProps) {
  return (
    <Container>
      {movie.backdrop_path && (
        <BackdropImage image={getImageURL(movie.backdrop_path, "original")} />
      )}
      <InfoOverlay>
        <Title>{movie.title}</Title>
        <Description>{movie.overview}</Description>
      </InfoOverlay>
      <ButtonContainer>
        <ButtonColumn>
          <SquareButton size="big" bgColor="main">
            상세보기
          </SquareButton>
        </ButtonColumn>
        <ButtonColumn>
          <SquareButton size="big" bgColor="main">
            + 내가 찜한 콘텐츠
          </SquareButton>
          <SquareButton size="big" bgColor="main">
            ♡ 좋아요
          </SquareButton>
        </ButtonColumn>
      </ButtonContainer>
    </Container>
  );
}

export default RecommendedMovie;
