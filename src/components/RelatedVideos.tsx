import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { movieApi, tvApi } from "../api/api";
import { Video } from "../api/types";
import { getYoutubeThumbnailURL } from "../common/imageGetter";
import GridItem from "./GridItem";
import { useGridSettings } from "./GridSettingsProvider";
import ScrollGridCategory from "./ScrollGridCategory";

const YTLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

type RelatedVideosProps = {
  id: number;
  isMovie: boolean;
};

function RelatedVideos({ id, isMovie }: RelatedVideosProps) {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const { columnWidth, scrollRatio } = useGridSettings();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (isMovie) {
          const { data } = await movieApi.videos(id);

          setVideos(data.results);
        } else {
          const { data } = await tvApi.videos(id);

          setVideos(data.results);
        }
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
      {videos.length !== 0 && (
        <ScrollGridCategory
          title="관련 영상"
          columnWidth={columnWidth}
          gap={15}
          scrollRatio={scrollRatio}
          listLength={videos.length}
        >
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
        </ScrollGridCategory>
      )}
    </>
  );
}

export default RelatedVideos;
