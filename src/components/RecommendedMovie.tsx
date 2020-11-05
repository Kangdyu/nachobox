import React from "react";
import styled from "styled-components";
import { MovieListItem } from "../api/types";
import SquareButton from "./SquareButton";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const BackdropImage = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px) opacity(70%);
`;

const InfoOverlay = styled.div`
  position: absolute;
  left: 5%;
  top: 35vh;
  width: 90%;
`;

const Title = styled.h1`
  width: 75%;
  font-size: 5vw;
  font-weight: 900;

  margin-bottom: 150px;
`;

const ButtonContainer = styled.div`
  width: 100%;
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
      <BackdropImage
        image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      />
      <InfoOverlay>
        <Title>{movie.title}</Title>
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
      </InfoOverlay>
    </Container>
  );
}

export default RecommendedMovie;
