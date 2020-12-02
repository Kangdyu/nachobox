import BackdropImage from "components/common/BackdropImage";
import Detail from "pages/Detail";
import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { MainContainer } from "styles";
import { getPosterURL } from "utils/imageGetter";
import Credits from "./Credits";
import ProductionCompanies from "./ProductionCompanies";
import RelatedVideos from "./RelatedVideos";
import Seasons from "./Seasons";
import {
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

type TVDetailContainerProps = {
  id: number;
};

function TVDetailContainer({ id }: TVDetailContainerProps) {
  // return (
  //   <MainContainer>
  //     <Helmet>
  //       <title>{`${detail.name} | NachoBox`}</title>
  //     </Helmet>
  //     {detail.backdrop_path && (
  //       <BackdropImage image={getPosterURL(detail.backdrop_path, "original")} />
  //     )}
  //     <MainGrid>
  //       <Poster
  //         src={
  //           detail.poster_path
  //             ? getPosterURL(detail.poster_path, "w500")
  //             : require("assets/no-image.png")
  //         }
  //       />
  //       <InfoContainer>
  //         <MovieInfoContainer>
  //           <Title>{detail.name}</Title>
  //           <DetailsContainer>
  //             <DetailItem>{`첫 방영일: ${detail.first_air_date}`}</DetailItem>
  //             <DetailItem>{`마지막 방영일: ${detail.last_air_date}`}</DetailItem>
  //             <DetailItem>
  //               {"시즌 " + detail.number_of_seasons + "개"}
  //             </DetailItem>
  //             <DetailItem>{`총 에피소드 ${detail.number_of_episodes}개`}</DetailItem>
  //           </DetailsContainer>
  //           <DetailsContainer>
  //             {detail.genres.map((genre) => (
  //               <Badge key={genre.id}>{genre.name}</Badge>
  //             ))}
  //           </DetailsContainer>
  //           <Rating>평점: ★ {detail.vote_average} / 10</Rating>
  //           <Overview>
  //             {detail.overview ? detail.overview : "등록된 소개글이 없습니다."}
  //           </Overview>
  //         </MovieInfoContainer>
  //       </InfoContainer>
  //     </MainGrid>

  //     {detail.seasons.length !== 0 && <Seasons seasons={detail.seasons} />}
  //     {videos && <RelatedVideos videos={videos} />}
  //     {credits && <Credits credits={credits} />}
  //     {detail.production_companies.length !== 0 && (
  //       <ProductionCompanies companies={detail.production_companies} />
  //     )}
  //     {recommendations && (
  //       <Recommendations recommendations={recommendations} isMovie={false} />
  //     )}
  //   </MainContainer>
  // );
  return <div>tvdetail</div>;
}

export default TVDetailContainer;
