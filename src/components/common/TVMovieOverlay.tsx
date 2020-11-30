import React from "react";
import styled from "styled-components";

import { MovieListItem, TVListItem } from "api/types";

import { isMovieListItem } from "utils/typeGuards";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);

  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const OverlayRow = styled.div`
  display: flex;
  padding: 5px 0;
`;

const OverlayTitle = styled(OverlayRow)`
  font-size: 1.1rem;
`;

const OverlayReleaseDate = styled(OverlayRow)`
  font-size: 0.8rem;
  color: #aaa;
  flex: 1;
`;

const OverlayRating = styled(OverlayRow)`
  font-size: 0.8rem;
  justify-content: flex-end;
`;

type TVMovieOverlayProps = {
  item: MovieListItem | TVListItem;
};

function TVMovieOverlay({ item }: TVMovieOverlayProps) {
  return (
    <Overlay>
      <OverlayTitle>
        {isMovieListItem(item) ? item.title : item.name}
      </OverlayTitle>
      <OverlayReleaseDate>
        {isMovieListItem(item) ? item.release_date : item.first_air_date}
      </OverlayReleaseDate>
      <OverlayRating>★ {item.vote_average} / 10</OverlayRating>
    </Overlay>
  );
}

export default TVMovieOverlay;
