import styled from "styled-components";

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 40px;
  margin-bottom: 100px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    grid-template-columns: none;
    grid-template-rows: auto auto;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
  }
`;

export const Poster = styled.img`
  width: 100%;
  height: auto;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    width: 20%;
    margin: 0 auto;
  }

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.tablet}) {
    width: 30%;
    margin: 0 auto;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
`;

export const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    align-items: center;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 1.8rem;
    text-align: center;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 0.9rem;
  }
`;

export const DetailItem = styled.span`
  display: block;
  color: #ccc;

  &:not(:last-child)::after {
    content: "·";
    margin: 0 5px;
  }
`;

export const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
  border-radius: 5px;

  &:not(:last-child) {
    margin-right: 5px;
  }
`;

export const IMDBIcon = styled.a`
  img {
    height: 1.3rem;
  }
`;

export const Rating = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.highlight};

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 1.2rem;
  }
`;

export const Overview = styled.div`
  font-size: 1.2rem;
  line-height: 2;
  margin-top: 30px;

  @media only screen and (max-width: ${({ theme }) =>
      theme.responsive.pcSmall}) {
    font-size: 1rem;
  }
`;
