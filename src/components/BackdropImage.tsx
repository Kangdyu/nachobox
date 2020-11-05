import React from "react";
import styled from "styled-components";

const Backdrop = styled.div<{ image: string }>`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.image});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px) opacity(70%) brightness(50%);
`;

type BackdropImageProps = {
  image: string;
};

function BackdropImage({ image }: BackdropImageProps) {
  return <Backdrop image={image} />;
}

export default BackdropImage;
