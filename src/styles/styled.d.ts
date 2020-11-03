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
      main: string;
      secondary: string;
      highlight: string;
    };
  }
}
