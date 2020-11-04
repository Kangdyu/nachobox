import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ color?: string; size?: string }>``;

type ButtonProps = {
  color?: string;
  size?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
};

function Button({ color, size, onClick, children }: ButtonProps) {
  return (
    <StyledButton color={color} size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
