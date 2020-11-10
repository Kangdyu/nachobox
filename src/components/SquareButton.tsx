import React from "react";
import styled, { css } from "styled-components";

type ButtonSize = "big" | "medium" | "small";

type StyleProps = {
  bgColor: string;
  color: string;
  size: ButtonSize;
  outline?: boolean;
};

type Size = {
  [size: string]: {
    width: string;
    height: string;
    fontSize: string;
    borderRadius: string;
  };
};

const sizes: Size = {
  big: {
    width: "200px",
    height: "67px",
    fontSize: "1.2rem",
    borderRadius: "22px",
  },
  medium: {
    width: "150px",
    height: "50px",
    fontSize: "1rem",
    borderRadius: "16px",
  },
  small: {
    width: "100px",
    height: "34px",
    fontSize: "1rem",
    borderRadius: "11px",
  },
};

const sizeStyle = css<StyleProps>`
  ${({ size }) =>
    css`
      width: ${sizes[size].width};
      height: ${sizes[size].height};
      font-size: ${sizes[size].fontSize};
      border-radius: ${sizes[size].borderRadius};
    `}
`;

const colorStyle = css<StyleProps>`
  ${({ bgColor, color, theme }) => css`
    background-color: ${theme.colors[bgColor]
      ? theme.colors[bgColor]
      : bgColor};
    color: ${theme.colors[color] ? theme.colors[color] : color};
  `}
`;

const outlineStyle = css<StyleProps>`
  ${({ outline, bgColor, theme }) =>
    outline &&
    css`
      background-color: transparent;
      border: 2px solid
        ${theme.colors[bgColor] ? theme.colors[bgColor] : bgColor};
    `}
`;

const Button = styled.button<StyleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  font: inherit;

  ${sizeStyle}
  ${colorStyle}
  ${outlineStyle}

  &:hover {
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.white};
  }

  transition-property: background-color color;
  transition-duration: 0.1s;
  transition-timing-function: linear;
`;

type SquareButtonProps = StyleProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

function SquareButton({
  bgColor,
  color,
  size,
  outline,
  onClick,
  children,
  ...rest
}: SquareButtonProps) {
  return (
    <Button
      bgColor={bgColor}
      color={color}
      size={size}
      outline={outline}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
}

SquareButton.defaultProps = {
  bgColor: "highlight",
  color: "main",
  size: "medium",
};

export default SquareButton;
