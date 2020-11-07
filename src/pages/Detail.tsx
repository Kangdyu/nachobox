import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { movieApi, tvApi } from "../api/api";
import { MovieDetail, TVDetail } from "../api/types";

import getImageURL from "../common/getImageURL";
import { isMovieDetail } from "../common/typeGuards";

import BackdropImage from "../components/BackdropImage";
import Credits from "../components/Credits";
import Loading from "../components/Loading";
import Recommendations from "../components/Recommendations";
import RelatedVideos from "../components/RelatedVideos";
import SquareButton from "../components/SquareButton";
import { MainContainer } from "../styles";

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 40px;
  margin-bottom: 40px;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MovieInfoContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button:not(:last-child) {
    margin-right: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const DetailItem = styled.span`
  display: inline-block;
  color: #ccc;

  &:not(:last-child)::after {
    content: "·";
    margin: 0 5px;
  }
`;

const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
  border-radius: 5px;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

const IMDBIcon = styled.a`
  img {
    height: 1.3rem;
  }
`;

const Rating = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.highlight};
`;

const Overview = styled.div`
  font-size: 1.2rem;
  line-height: 2;
  margin-top: 30px;
`;

function Detail() {
  const isMovie = useLocation().pathname.split("/")[1] === "movies";
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MovieDetail | TVDetail>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (isMovie) {
          const { data: movie } = await movieApi.detail(+id);

          setData(movie);
        } else {
          const { data: tv } = await tvApi.detail(+id);

          setData(tv);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    window.scrollTo(0, 0);
    fetchData();
  }, [id, isMovie]);

  return (
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        data && (
          <>
            {data.backdrop_path && (
              <BackdropImage
                image={getImageURL(data.backdrop_path, "original")}
              />
            )}
            <MainGrid>
              <Poster
                src={
                  data.poster_path
                    ? getImageURL(data.poster_path, "w500")
                    : require("../assets/nacho-icon.png")
                }
              />
              <InfoContainer>
                <MovieInfoContainer>
                  <Title>{isMovieDetail(data) ? data.title : data.name}</Title>
                  <DetailsContainer>
                    <DetailItem>
                      {isMovieDetail(data)
                        ? data.release_date + " 개봉"
                        : `첫 방영일: ${data.first_air_date} / 마지막 방영일: ${data.last_air_date}`}
                    </DetailItem>
                    <DetailItem>
                      {isMovieDetail(data)
                        ? data.runtime + "분"
                        : "시즌 " + data.number_of_seasons + "개"}
                    </DetailItem>
                    {isMovieDetail(data) && (
                      <DetailItem>
                        <IMDBIcon
                          href={`https://www.imdb.com/title/${data.imdb_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                            alt="imdb icon"
                          />
                        </IMDBIcon>
                      </DetailItem>
                    )}
                  </DetailsContainer>
                  <DetailsContainer>
                    {data.genres.map((genre) => (
                      <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                  </DetailsContainer>
                  <Rating>평점: ★ {data.vote_average} / 10</Rating>
                  <Overview>
                    {data.overview
                      ? data.overview
                      : "등록된 소개글이 없습니다."}
                  </Overview>
                </MovieInfoContainer>
                <ButtonContainer>
                  <SquareButton size="big">찜하기</SquareButton>
                  <SquareButton size="big">좋아요</SquareButton>
                </ButtonContainer>
              </InfoContainer>
            </MainGrid>
            <RelatedVideos />
            <Credits id={data.id} isMovie={isMovie} />
            <Recommendations id={data.id} isMovie={isMovie} />
          </>
        )
      )}
    </MainContainer>
  );
}

export default Detail;
