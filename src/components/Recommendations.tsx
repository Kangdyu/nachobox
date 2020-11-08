import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../api/api";
import { MovieListItem, TVListItem } from "../api/types";
import ScrollGridCategory from "./ScrollGridCategory";
import TVMovieGridItem from "./TVMovieGridItem";

type RecommendationsProps = {
  id: number;
  isMovie: boolean;
};

function Recommendations({ id, isMovie }: RecommendationsProps) {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<
    (MovieListItem | TVListItem)[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      let apiFunc;
      if (isMovie) {
        apiFunc = movieApi.recommendations;
      } else {
        apiFunc = tvApi.recommendations;
      }

      try {
        const { data } = await apiFunc(id);

        setRecommendations(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, isMovie]);

  if (loading) {
    return null;
  }

  return (
    <>
      {recommendations.length !== 0 && (
        <ScrollGridCategory
          title={isMovie ? "추천 영화" : "추천 TV 프로그램"}
          columnWidth={200}
          gap={15}
          scrollRatio={2}
          listLength={recommendations.length}
        >
          <TVMovieGridItem list={recommendations} />
        </ScrollGridCategory>
      )}
    </>
  );
}

export default Recommendations;
