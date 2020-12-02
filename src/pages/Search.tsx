import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Loading from "components/common/Loading";
import ScrollGrid from "components/common/ScrollGrid";
import TVMovieGridItem from "components/common/TVMovieGridItem";

import useQuery from "hooks/useQuery";

import { MainContainer } from "styles";
import { useSelector } from "react-redux";
import { RootState } from "modules";
import useAppDispatch from "hooks/useAppDispatch";
import { fetchSearchResults } from "modules/search";
import ErrorPage from "components/common/ErrorPage";

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

function Search() {
  const searchTerm = useQuery("term") as string;
  const { movies, tvShows, loading, error } = useSelector(
    (state: RootState) => state.search[searchTerm]
  ) || {
    movies: [],
    tvs: [],
    loading: true,
    error: null,
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;
  return (
    <>
      <Helmet>
        <title>검색 | NachoBox</title>
      </Helmet>
      <MainContainer>
        <Title>"{searchTerm}" 검색 결과</Title>
        {movies.length !== 0 && (
          <ScrollGrid title="영화" listLength={movies.length}>
            <TVMovieGridItem list={movies} />
          </ScrollGrid>
        )}
        {tvShows.length !== 0 && (
          <ScrollGrid title="TV 프로그램" listLength={tvShows.length}>
            <TVMovieGridItem list={tvShows} />
          </ScrollGrid>
        )}
        {movies.length === 0 && tvShows.length === 0 && "검색 결과가 없습니다."}
      </MainContainer>
    </>
  );
}

export default Search;
