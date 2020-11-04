import React from "react";
import styled from "styled-components";
import { MovieListItem } from "../api/types";
import Button from "./Button";

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
  width: 70%;
  font-size: 5vw;
  font-weight: 900;

  margin-bottom: 150px;
`;

const ButtonContainer = styled.div`
  width: 90%;
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
          <Button>+ 내가 찜한 콘텐츠</Button>
          <Button>♡ 좋아요</Button>
          <Button>상세보기</Button>
        </ButtonContainer>
      </InfoOverlay>
    </Container>
  );
}

export default RecommendedMovie;
