import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { movieApi, tvApi } from "api/api";
import { MovieDetail, TVDetail } from "api/types";

import { getPosterURL } from "utils/imageGetter";
import { isMovieDetail } from "utils/typeGuards";

import BackdropImage from "components/common/BackdropImage";
import GridItem from "components/common/GridItem";
import Loading from "components/common/Loading";
import ScrollGrid from "components/common/ScrollGrid";

import Credits from "components/detail/Credits";
import Recommendations from "components/detail/Recommendations";
import RelatedVideos from "components/detail/RelatedVideos";

import PageNotFound from "pages/PageNotFound";

import { MainContainer } from "styles";

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 40px;
  margin-bottom: 100px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    grid-template-columns: none;
    grid-template-rows: auto auto;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    width: 20%;
    margin: 0 auto;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
    width: 30%;
    margin: 0 auto;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
`;

const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 1.8rem;
    text-align: center;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 0.9rem;
  }
`;

const DetailItem = styled.span`
  display: block;
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

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 1.2rem;
  }
`;

const Overview = styled.div`
  font-size: 1.2rem;
  line-height: 2;
  margin-top: 30px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 1rem;
  }
`;

function Detail() {
  const isMovie = useLocation().pathname.split("/")[1] === "movies";
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MovieDetail | TVDetail>();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
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
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {data ? (
            <MainContainer>
              <Helmet>
                <title>
                  {isMovieDetail(data)
                    ? `${data.title} | NachoBox`
                    : `${data.name} | NachoBox`}
                </title>
              </Helmet>
              {data.backdrop_path && (
                <BackdropImage
                  image={getPosterURL(data.backdrop_path, "original")}
                />
              )}
              <MainGrid>
                <Poster
                  src={
                    data.poster_path
                      ? getPosterURL(data.poster_path, "w500")
                      : require("assets/no-image.png")
                  }
                />
                <InfoContainer>
                  <MovieInfoContainer>
                    <Title>
                      {isMovieDetail(data) ? data.title : data.name}
                    </Title>
                    <DetailsContainer>
                      <DetailItem>
                        {isMovieDetail(data)
                          ? data.release_date + " 개봉"
                          : `첫 방영일: ${data.first_air_date}`}
                      </DetailItem>
                      {!isMovieDetail(data) && (
                        <DetailItem>{`마지막 방영일: ${data.last_air_date}`}</DetailItem>
                      )}
                      <DetailItem>
                        {isMovieDetail(data)
                          ? data.runtime + "분"
                          : "시즌 " + data.number_of_seasons + "개"}
                      </DetailItem>
                      {!isMovieDetail(data) && (
                        <DetailItem>{`총 에피소드 ${data.number_of_episodes}개`}</DetailItem>
                      )}
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
                </InfoContainer>
              </MainGrid>

              {!isMovieDetail(data) && data.seasons.length !== 0 && (
                <ScrollGrid title="시즌 정보" listLength={data.seasons.length}>
                  {data.seasons.map((season) => (
                    <GridItem
                      key={season.id}
                      title={season.name}
                      subtitle={`에피소드 ${season.episode_count}개`}
                      image={
                        season.poster_path
                          ? getPosterURL(season.poster_path, "w500")
                          : require("assets/no-image.png")
                      }
                    />
                  ))}
                </ScrollGrid>
              )}
              <RelatedVideos id={data.id} isMovie={isMovie} />
              <Credits id={data.id} isMovie={isMovie} />
              {data.production_companies.length !== 0 && (
                <ScrollGrid
                  title="제작사"
                  listLength={data.production_companies.length}
                >
                  {data.production_companies.map((company) => (
                    <GridItem
                      key={company.id}
                      title={company.name}
                      subtitle={company.origin_country}
                      image={
                        company.logo_path
                          ? getPosterURL(company.logo_path, "w500")
                          : require("assets/no-image.png")
                      }
                      heightRatio={0.4}
                    />
                  ))}
                </ScrollGrid>
              )}
              <Recommendations id={data.id} isMovie={isMovie} />
            </MainContainer>
          ) : (
            <PageNotFound />
          )}
        </>
      )}
    </>
  );
}

export default Detail;
