import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import BackdropImage from "components/common/BackdropImage";
import Loading from "components/common/Loading";

import useAppDispatch from "hooks/useAppDispatch";

import { RootState } from "modules";
import { fetchMovieDetail } from "modules/movies";

import { getPosterURL } from "utils/imageGetter";

import Credits from "./Credits";
import ProductionCompanies from "./ProductionCompanies";
import Recommendations from "./Recommendations";
import RelatedVideos from "./RelatedVideos";

import { MainContainer } from "styles";
import {
  Badge,
  DetailItem,
  DetailsContainer,
  IMDBIcon,
  InfoContainer,
  MainGrid,
  MovieInfoContainer,
  Overview,
  Poster,
  Rating,
  Title,
} from "./styles";
import ErrorPage from "components/common/ErrorPage";

type MovieDetailContainerProps = {
  id: number;
};

function MovieDetailContainer({ id }: MovieDetailContainerProps) {
  const {
    detail,
    credits,
    recommendations,
    videos,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies.details[id]) || {
    detail: null,
    credits: null,
    recommendations: [],
    videos: [],
    loading: true,
    error: null,
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
  }, [dispatch, id]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;
  if (!detail)
    return <ErrorPage message="상세 정보를 불러오는 데 실패했습니다." />;
  return (
    <>
      <Helmet>
        <title>{`${detail.title} | NachoBox`}</title>
      </Helmet>
      <MainContainer>
        {detail.backdrop_path && (
          <BackdropImage
            image={getPosterURL(detail.backdrop_path, "original")}
          />
        )}
        <MainGrid>
          <Poster
            src={
              detail.poster_path
                ? getPosterURL(detail.poster_path, "w500")
                : require("assets/no-image.png")
            }
          />
          <InfoContainer>
            <MovieInfoContainer>
              <Title>{detail.title}</Title>
              <DetailsContainer>
                <DetailItem>{detail.release_date + " 개봉"}</DetailItem>
                <DetailItem>{detail.runtime + "분"}</DetailItem>
                <DetailItem>
                  <IMDBIcon
                    href={`https://www.imdb.com/title/${detail.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                      alt="imdb icon"
                    />
                  </IMDBIcon>
                </DetailItem>
              </DetailsContainer>
              <DetailsContainer>
                {detail.genres.map((genre) => (
                  <Badge key={genre.id}>{genre.name}</Badge>
                ))}
              </DetailsContainer>
              <Rating>평점: ★ {detail.vote_average} / 10</Rating>
              <Overview>
                {detail.overview
                  ? detail.overview
                  : "등록된 소개글이 없습니다."}
              </Overview>
            </MovieInfoContainer>
          </InfoContainer>
        </MainGrid>

        {videos && <RelatedVideos videos={videos} />}
        {credits && <Credits credits={credits} />}
        {detail.production_companies.length !== 0 && (
          <ProductionCompanies companies={detail.production_companies} />
        )}
        {recommendations && (
          <Recommendations recommendations={recommendations} isMovie />
        )}
      </MainContainer>
    </>
  );
}

export default MovieDetailContainer;
