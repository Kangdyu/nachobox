import React, { useEffect, useState } from "react";

import { movieApi, tvApi } from "api/api";
import { MovieListItem, TVListItem } from "api/types";

import ScrollGrid from "components/common/ScrollGrid";
import TVMovieGridItem from "components/common/TVMovieGridItem";

type RecommendationsProps = {
  recommendations: (MovieListItem | TVListItem)[];
  isMovie: boolean;
};

function Recommendations({ recommendations, isMovie }: RecommendationsProps) {
  return (
    <>
      {recommendations.length !== 0 && (
        <ScrollGrid
          title={isMovie ? "추천 영화" : "추천 TV 프로그램"}
          listLength={recommendations.length}
        >
          <TVMovieGridItem list={recommendations} />
        </ScrollGrid>
      )}
    </>
  );
}

export default Recommendations;
