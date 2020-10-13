import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    paddings: {
      containerTop: string;
      side: string;
    }
    colors: {
      main: string;
      secondary: string;
      highlight: string;
    }
  }
}