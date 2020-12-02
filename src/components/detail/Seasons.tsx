import { Season } from "api/types";
import GridItem from "components/common/GridItem";
import ScrollGrid from "components/common/ScrollGrid";
import React from "react";
import { getPosterURL } from "utils/imageGetter";

type SeasonsProps = {
  seasons: Season[];
};

function Seasons({ seasons }: SeasonsProps) {
  return (
    <ScrollGrid title="시즌 정보" listLength={seasons.length}>
      {seasons.map((season) => (
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
  );
}

export default Seasons;
