import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import BookList from '../components/Books';
import BooksLoader from '../components/ContentLoaders/BooksLoader';
import HeaderTitle from '../components/common/HeaderTitle';

import { bookFilter, clientHandler } from '../graphql';

import { appRootStyle } from '../styles';
import { HOME_HEADER_TITLE } from '../settings';

const Main = () => {
  const [infiniteScrollActive, setInfiniteScrollActive] = useState(false);
  const [randomDigit, setRandomDigit] = useState(0);
  const [books, setBooks] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    retrieveBooks();
  }, []);

  const queryBookFilter = async (customFrom, size, isRefreshing) => {
    try {
      const client = await clientHandler();
      const bookList = await client.query({
        query: bookFilter,
        variables: {
          search: '',
          from: customFrom + 1,
          size: size
        }
      });
      const { data: { searchBooks = [] } } = bookList;
      let combinedBooks = [...searchBooks];

      if (!isRefreshing) {
        combinedBooks = [...books, ...combinedBooks];
      }

      setBooks(combinedBooks);
      setLoadingBook(false);
      setInfiniteScrollActive(false);
      setRandomDigit(customFrom);
    } catch (error) {
      setBooks([...books]);
      setLoadingBook(false);
    }
  };

  const retrieveBooks = async () => {
    setLoadingBook(true);
    const size = 20;
    const from = 0;

    await queryBookFilter(from, size);
  };

  const handlePullRefresh = async () => {
    const size = 20;

    setRefreshing(true);

    await queryBookFilter(randomDigit, size, true);

    setRefreshing(false);
  };

  const handleInfiniteScroll = async () => {
    const size = 20;
    const from = randomDigit + size;

    setInfiniteScrollActive(true);

    await queryBookFilter(from, size);
  };

  const renderView = () => {
    if (loadingBook) {
      return <BooksLoader />;
    }

    return (
      <BookList
        bookList={books}
        handleInfiniteScroll={handleInfiniteScroll}
        infiniteScrollActive={infiniteScrollActive}
        handlePullRefresh={handlePullRefresh}
        refreshing={refreshing}
      />
    );
  };

  return (
    <View style={appRootStyle.container}>
      {renderView()}
    </View >
  );
};

Main.navigationOptions = {
  headerBackTitle: null,
  headerTitle: (
    <HeaderTitle title={HOME_HEADER_TITLE} />
  ),
  headerStyle: {
    elevation: 1,
  },
};

export default Main;
