import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { movieApi, tvApi } from "../api/api";
import { MovieDetail, TVDetail } from "../api/types";
import getImageURL from "../common/getImageURL";
import { isMovieDetail } from "../common/typeGuards";
import BackdropImage from "../components/BackdropImage";
import Loading from "../components/Loading";
import { MainContainer } from "../styles";

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 40px;
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
`;

const InfoContainer = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const DetailItem = styled.span`
  display: inline-block;

  &:not(:last-child)::after {
    content: "·";
    margin: 0 5px;
  }
`;

const GenreItem = styled.span`
  &:not(:last-child)::after {
    content: " / ";
  }
`;

const IMDBIcon = styled.a`
  img {
    height: 1.3rem;
  }
`;

const Overview = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
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
                <Title>{isMovieDetail(data) ? data.title : data.name}</Title>
                <DetailsContainer>
                  <DetailItem>
                    {isMovieDetail(data)
                      ? data.release_date
                      : data.first_air_date}
                  </DetailItem>
                  <DetailItem>
                    {isMovieDetail(data)
                      ? data.runtime + "분"
                      : "시즌 " + data.number_of_seasons + "개"}
                  </DetailItem>
                  <DetailItem>
                    {data.genres.map((genre) => (
                      <GenreItem key={genre.id}>{genre.name}</GenreItem>
                    ))}
                  </DetailItem>
                  <DetailItem>★ {data.vote_average}</DetailItem>
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
                <Overview>{data.overview}</Overview>
              </InfoContainer>
            </MainGrid>
          </>
        )
      )}
    </MainContainer>
  );
}

export default Detail;
