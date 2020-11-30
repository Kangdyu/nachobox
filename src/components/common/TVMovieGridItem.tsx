import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { MovieListItem, TVListItem } from "api/types";

import { getPosterURL } from "utils/imageGetter";
import { isMovieListItem } from "utils/typeGuards";

import GridItem from "components/common/GridItem";
import TVMovieOverlay from "components/common/TVMovieOverlay";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

type TVMovieGridItemProps = {
  list: (MovieListItem | TVListItem)[];
};

function TVMovieGridItem({ list }: TVMovieGridItemProps) {
  return (
    <>
      {list.map((item) => (
        <StyledLink
          key={item.id}
          to={isMovieListItem(item) ? `/movies/${item.id}` : `/tv/${item.id}`}
        >
          <GridItem
            image={
              item.poster_path
                ? getPosterURL(item.poster_path, "w500")
                : require("assets/no-image.png")
            }
            title={isMovieListItem(item) ? item.title : item.name}
            subtitle={
              isMovieListItem(item)
                ? item.release_date && item.release_date.split("-")[0]
                : item.first_air_date && item.first_air_date.split("-")[0]
            }
          >
            <TVMovieOverlay item={item} />
          </GridItem>
        </StyledLink>
      ))}
    </>
  );
}

export default TVMovieGridItem;
