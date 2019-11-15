import React from 'react';

import { View, } from 'react-native';
import BookMeta from './BookMeta';
import CustomText from '../common/CustomText';
import { appRootStyle } from '../../styles';

const BookSuggestions = ({
  book, renderAuthors, toggleImageEnlarger, navigateToRecommended
}) => {
  const mainBookMeta = false;
  const { moreBooks } = book;

  if (!moreBooks && !moreBooks.length) {
    return <View />;
  }

  const renderMoreBooks = moreBooks.map(item => {
    return (
      <View key={item.id}>
        <BookMeta
          book={item}
          mainBookMeta={mainBookMeta}
          renderAuthors={renderAuthors}
          toggleImageEnlarger={toggleImageEnlarger}
          navigateToRecommended={navigateToRecommended}
        />
      </View>
    );
  });

  const moreBooksHeader = moreBooks.length ? (
    <CustomText style={appRootStyle.suggestionHeader}>
      Recommended
    </CustomText>
  ) : <View />;

  return (
    <View style={appRootStyle.bookSuggestions}>
      {moreBooksHeader}
      {renderMoreBooks}
    </View>
  );
};

export default BookSuggestions;
