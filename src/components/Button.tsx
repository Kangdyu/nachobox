import React from "react";
import styled from "styled-components";

type StyledButtonProps = {
  bgColor?: string;
  color?: string;
  size?: string;
};

const StyledButton = styled.button<StyledButtonProps>``;

type ButtonProps = {
  bgColor?: string;
  color?: string;
  size?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
};

function Button({ bgColor, color, size, onClick, children }: ButtonProps) {
  return (
    <StyledButton bgColor={bgColor} color={color} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
