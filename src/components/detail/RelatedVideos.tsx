import React from "react";
import styled from "styled-components";

import { Video } from "api/types";

import GridItem from "components/common/GridItem";
import ScrollGrid from "components/common/ScrollGrid";

import { getYoutubeThumbnailURL } from "utils/imageGetter";

const YTLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

type RelatedVideosProps = {
  videos: Video[];
};

function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <>
      {videos.length !== 0 && (
        <ScrollGrid title="관련 영상" listLength={videos.length}>
          {videos.map(
            (video) =>
              video.site === "YouTube" && (
                <YTLink
                  key={video.id}
                  href={`https://youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GridItem
                    image={getYoutubeThumbnailURL(video.key)}
                    heightRatio={0.75}
                    title={video.name}
                  />
                </YTLink>
              )
          )}
        </ScrollGrid>
      )}
    </>
  );
}

export default RelatedVideos;
