import React, { Fragment } from 'react';
import { View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import BookCard from './BookCard';

const bookList = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const BooksLoader = () => {
  const renderLoader = () => {
    const bookListItem = ({ id }) => (
      <View key={id}>
        <BookCard />
      </View>
    );

    return (
      <FlatGrid
        items={bookList}
        renderItem={({ item }) => bookListItem(item)}
        spacing={38}
      />
    );
  };

  return (
    <Fragment>
      {renderLoader()}
    </Fragment>
  );
};

export default BooksLoader;
