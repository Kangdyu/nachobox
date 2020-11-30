import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useGridSettings } from "components/common/GridSettingsProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Overlay = styled.div``;

const PosterContainer = styled.div`
  position: relative;
  margin-bottom: 5px;

  &:hover {
    ${Overlay} {
      div {
        opacity: 1;
      }
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 1rem;
  padding: 5px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Subtitle = styled.h3`
  font-size: 0.9rem;
  padding: 5px 0;
  color: ${({ theme }) => theme.colors.gray};
`;

type GridItemProps = {
  title: string;
  subtitle?: string;
  image: string;
  heightRatio?: number;
  children?: React.ReactNode;
};

function GridItem({
  title,
  subtitle,
  image,
  heightRatio = 1.5,
  children,
}: GridItemProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const { columnWidth } = useGridSettings();

  useEffect(() => {
    if (imageRef.current) {
      const { current: elem } = imageRef;
      elem.style.height = columnWidth * heightRatio + "px";
    }
  }, [heightRatio, columnWidth]);

  return (
    <Container>
      <PosterContainer>
        <Poster ref={imageRef} src={image} />
        <Overlay>{children}</Overlay>
      </PosterContainer>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
}

export default GridItem;
