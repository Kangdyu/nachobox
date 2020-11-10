import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    footerHeight: string;
    paddings: {
      containerTop: string;
      containerBottom: string;
      side: string;
    };
    colors: {
      [index: string]: string;
      main: string;
      secondary: string;
      highlight: string;
      black: string;
      gray: string;
      white: string;
    };
    responsive: {
      pcSmall: string;
      tablet: string;
      mobile: string;
    };
  }
}
