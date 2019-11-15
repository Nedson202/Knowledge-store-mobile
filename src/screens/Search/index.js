import React, { useState, useEffect } from 'react';
import { View, ScrollView, } from 'react-native';
import { SafeAreaView, NavigationEvents } from 'react-navigation';

import Browse from './Browse';
import SearchHistory from './SearchHistory';
import SearchInput from './SearchInput';

import useDebounce from '../../components/CustomHooks/useDebounce';

import { searchStyle, appRootStyle } from '../../styles';
import { getGenres, bookFilter, clientHandler } from '../../graphql';

import { SEARCH_RESULT_ROUTE, SEARCH_DEBOUNCE_TIME, } from '../../settings';
import NavigationService from '../../base/NavigationService';
import {
  createSearchHistory, retrieveSearchHistory,
  clearSearchHistory
} from '../../utils';

const Search = () => {
  const [searchFieldInFocus, setSearchFieldInFocus] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [history, setHistory] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genreLoading, setGenreLoading] = useState(true);
  const debouncedSearchTerm = useDebounce(searchText, SEARCH_DEBOUNCE_TIME);

  useEffect(() => {
    retrieveGenres();

    if (debouncedSearchTerm) {
      activateSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const retrieveGenres = async () => {
    try {
      const client = await clientHandler();
      const genreHandler = await client.query({
        query: getGenres,
      });
      const { data: { getGenres: retrievedGenres } } = genreHandler;

      setGenres(retrievedGenres);
      setGenreLoading(false);
    } catch (error) {
      setGenreLoading(false);
      console.log(error);
    }
  };

  const activateSearch = async (value) => {
    const trimValue = value.trim();

    if (!trimValue) {
      return;
    }

    const results = await queryBookFilter(trimValue);

    await createSearchHistory(trimValue);

    setSearchFieldInFocus(false);
    setSearchText('');
    setSearchActive(false);
    NavigationService.navigate(SEARCH_RESULT_ROUTE, {
      bookList: results,
    });
  };

  const screenFocused = async () => {
    const searchHistory = await retrieveSearchHistory();
    setHistory([...searchHistory]);
  };

  const handleSearchFocus = () => {
    setSearchFieldInFocus(true);
  };

  const closeRecentSearches = () => {
    setSearchFieldInFocus(false);
    setSearchActive(false);
  };

  const navigateToResult = (genre) => {
    return () => {
      NavigationService.navigate(SEARCH_RESULT_ROUTE, {
        genre: genre,
      });
    };
  };

  const handleSearch = () => {
    setSearchText(searchText);
  };

  const queryBookFilter = async (queryValue) => {
    try {
      setSearchActive(true);

      const client = await clientHandler();
      const searchResults = await client.query({
        query: bookFilter,
        variables: {
          search: queryValue,
          from: 0,
          size: 20
        }
      });
      const { data: { searchBooks = [] } } = searchResults;

      return searchBooks;
    } catch (error) {
      console.error(error);
    }
  };

  const clearUserSearchHistory = (id) => {
    return () => {
      try {
        let filterHistory = clearSearchHistory(id, history);

        setHistory([...filterHistory]);
      } catch (error) {
        return error;
      }
    };
  };

  const renderBrowseAndHistory = () => {
    let historyView;

    if (searchFieldInFocus && history.length) {
      historyView = <SearchHistory
        searchHistory={history}
        clearSearchHistory={clearUserSearchHistory}
        navigateToResult={navigateToResult}
      />;
    }

    return (
      <View>
        {historyView}
        <Browse
          genreList={genres}
          genreLoading={genreLoading}
          navigateToResult={navigateToResult}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={searchStyle.androidSafeArea}>
      <NavigationEvents
        onDidFocus={screenFocused}
      />
      <View style={appRootStyle.container}>
        <SearchInput
          handleSearchFocus={handleSearchFocus}
          closeRecentSearches={closeRecentSearches}
          searchText={searchText}
          handleSearch={handleSearch}
          showLoading={searchActive}
        />
        <ScrollView>
          {renderBrowseAndHistory()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

Search.navigationOptions = {
  header: null,
  headerBackTitle: null,
};

export default Search;
