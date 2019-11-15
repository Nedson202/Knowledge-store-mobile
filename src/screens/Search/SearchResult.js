import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { appRootStyle } from '../../styles';
import { bookFilter, clientHandler } from '../../graphql';
import Spinner from '../../components/common/Spinner';
import BookList from '../../components/Books';
import HeaderTitle from '../../components/common/HeaderTitle';
import { RESULT_TITLE, GENRE_PARAM, BOOK_LIST_PARAM } from '../../settings';

const SearchResult = ({ navigation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchActive, setSearchActive] = useState(true);

  const screenDidFocus = () => {
    const bookList = navigation.getParam(BOOK_LIST_PARAM) || [];
    if (!bookList.length) {
      searchByGenre();
    } else {
      setSearchResults([...bookList]);
      setSearchActive(false);
    }
  };

  const queryBookFilter = async (randomDigit, size) => {
    try {
      const client = await clientHandler();
      const bookGenre = navigation.getParam(GENRE_PARAM);
      const bookList = await client.query({
        query: bookFilter,
        variables: {
          search: bookGenre,
          from: 0,
          size: size
        }
      });
      const { data: { searchBooks = [] } = {} } = bookList;

      if (searchBooks) {
        setSearchResults([...searchResults, ...searchBooks]);
        setSearchActive(false);
      }
    } catch (error) {
      setSearchResults([]);
      console.error(error);
    }
  };

  const searchByGenre = async () => {
    const randomDigit = 0;
    const size = 20;
    await queryBookFilter(randomDigit, size);
  };

  const renderSearchResult = () => {
    if (searchActive) {
      return <Spinner />;
    }

    return (
      <View>
        <BookList
          navigation={navigation}
          bookList={searchResults}
        />
      </View>
    );
  };

  return (
    <View style={appRootStyle.container}>
      <NavigationEvents
        onDidFocus={screenDidFocus}
      />
      {renderSearchResult()}
    </View>
  );
};

let bookGenre;

SearchResult.navigationOptions = {
  headerTitle: (
    <HeaderTitle
      title={bookGenre || RESULT_TITLE}
    />
  ),
  headerStyle: {
    elevation: 0,
  },
};

export default SearchResult;
