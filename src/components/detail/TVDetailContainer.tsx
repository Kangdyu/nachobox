import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import BackdropImage from "components/common/BackdropImage";
import Loading from "components/common/Loading";

import useAppDispatch from "hooks/useAppDispatch";

import { RootState } from "modules";
import { fetchTVDetail } from "modules/tvShows";

import { getPosterURL } from "utils/imageGetter";

import Credits from "./Credits";
import ProductionCompanies from "./ProductionCompanies";
import Recommendations from "./Recommendations";
import RelatedVideos from "./RelatedVideos";
import Seasons from "./Seasons";

import { MainContainer } from "styles";
import {
  Badge,
  DetailItem,
  DetailsContainer,
  InfoContainer,
  MainGrid,
  MovieInfoContainer,
  Overview,
  Poster,
  Rating,
  Title,
} from "./styles";
import ErrorPage from "components/common/ErrorPage";

type TVDetailContainerProps = {
  id: number;
};

function TVDetailContainer({ id }: TVDetailContainerProps) {
  const {
    detail,
    credits,
    recommendations,
    videos,
    loading,
    error,
  } = useSelector((state: RootState) => state.tvShows.details[id]) || {
    detail: null,
    credits: null,
    recommendations: [],
    videos: [],
    loading: true,
    error: null,
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTVDetail(id));
  }, [dispatch, id]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;
  if (!detail)
    return <ErrorPage message="상세 정보를 불러오는 데 실패했습니다." />;
  return (
    <>
      <Helmet>
        <title>{`${detail.name} | NachoBox`}</title>
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
              <Title>{detail.name}</Title>
              <DetailsContainer>
                <DetailItem>{`첫 방영일: ${detail.first_air_date}`}</DetailItem>
                <DetailItem>{`마지막 방영일: ${detail.last_air_date}`}</DetailItem>
                <DetailItem>
                  {"시즌 " + detail.number_of_seasons + "개"}
                </DetailItem>
                <DetailItem>{`총 에피소드 ${detail.number_of_episodes}개`}</DetailItem>
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

        {detail.seasons.length !== 0 && <Seasons seasons={detail.seasons} />}
        {videos && <RelatedVideos videos={videos} />}
        {credits && <Credits credits={credits} />}
        {detail.production_companies.length !== 0 && (
          <ProductionCompanies companies={detail.production_companies} />
        )}
        {recommendations && (
          <Recommendations recommendations={recommendations} isMovie={false} />
        )}
      </MainContainer>
    </>
  );
}

export default TVDetailContainer;
