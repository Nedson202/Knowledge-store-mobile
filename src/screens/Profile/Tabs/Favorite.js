import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { appRootStyle, profileStyles } from '../../../styles';
import BookList from '../../../components/Books';
import {
  getFavorites, removeFavoritesMutation,
  clientHandler
} from '../../../graphql';
import CustomText from '../../../components/common/CustomText';

import {
  OUTLINE_TYPE, CANCEL_TITLE, REMOVE_FAVORITES_LABEL,
  WHITE_1
} from '../../../settings';

import BooksLoader from '../../../components/ContentLoaders/BooksLoader';
import useAuthSelector from '../../../components/CustomHooks/useAuthSelector';

const Favorite = () => {
  const [retrievingBooks, setRetrievingBooks] = useState(true);
  const [books, setBooks] = useState([]);
  const [removeFavorites, setRemoveFavorites] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedBookIDS, setCheckedBookIDS] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { auth } = useAuthSelector();

  useEffect(() => {
    retrieveFavorites();
  }, []);

  const retrieveFavorites = async () => {
    try {
      const { isAuthenticated: isUserAuthenticated } = auth;

      if (!isUserAuthenticated) {
        return;
      }

      const client = await clientHandler();
      const retrievedBooks = await client.query({
        query: getFavorites,
      });

      const { data: { favoriteBooks } } = retrievedBooks;

      if (favoriteBooks) {
        setBooks(favoriteBooks);
      }

      setRetrievingBooks(false);
    } catch (error) {
      setRetrievingBooks(false);
      console.error(error);
    }
  };

  const activateCheckbox = () => {
    setRemoveFavorites(!removeFavorites);
    setDisabled(true);
    setCheckedBookIDS([]);
  };

  const checkboxChange = (bookId) => {
    return () => {
      let bookIDS = [...checkedBookIDS];

      if (bookIDS.includes(bookId)) {
        bookIDS = bookIDS.filter(id => id !== bookId);
      } else {
        bookIDS.push(bookId);
      }

      const lengthOfIDS = bookIDS.length;
      let disabledStatus = false;

      if (lengthOfIDS === 1) {
        disabledStatus = false;
      } else if (lengthOfIDS < 1) {
        disabledStatus = true;
      }

      setDisabled(disabledStatus);
      setChecked(!checked);
      setCheckedBookIDS(bookIDS);
    };
  };

  const removeMarkedBooks = async () => {
    try {
      const client = await clientHandler();

      await client.mutate({
        mutation: removeFavoritesMutation,
        variables: {
          books: checkedBookIDS
        },
        refetchQueries: retrieveFavorites,
      });

      setRemoveFavorites(false);
    } catch (error) {
      console.error(error);
    }
  };

  const renderNotFound = () => {
    return (
      <View style={appRootStyle.container}>
        <CustomText>
          You have not added any book to your list of favorites.
        </CustomText>
      </View>
    );
  };

  const favoriteActionButtons = () => {
    if (removeFavorites) {
      return (
        <View style={profileStyles.favoritesActionButtons}>
          <Button
            title={'Remove marked'}
            type={OUTLINE_TYPE}
            titleStyle={[profileStyles.removeFavoritesButtonText, { color: WHITE_1, }]}
            buttonStyle={[
              profileStyles.actionButton,
              { backgroundColor: 'red', borderColor: 'transparent' }
            ]}
            disabled={disabled}
            onPress={removeMarkedBooks}
          />
          <Button
            title={CANCEL_TITLE}
            type={OUTLINE_TYPE}
            titleStyle={profileStyles.removeFavoritesButtonText}
            buttonStyle={profileStyles.actionButton}
            onPress={activateCheckbox}
          />
        </View>
      );
    }

    return (
      <View style={profileStyles.removeFavoritesButtonView}>
        <Button
          title={REMOVE_FAVORITES_LABEL}
          type={OUTLINE_TYPE}
          titleStyle={profileStyles.removeFavoritesButtonText}
          buttonStyle={profileStyles.removeFavoritesButton}
          onPress={activateCheckbox}
        />
      </View>
    );
  };

  if (retrievingBooks) {
    return <BooksLoader />;
  }

  if (!retrievingBooks && !books.length) {
    return renderNotFound();
  }

  return (
    <View style={profileStyles.favoritesContainer}>
      {favoriteActionButtons()}
      <View style={{ marginBottom: 70, marginTop: -15, }}>
        <BookList
          bookList={books}
          removeFavorites={removeFavorites}
          checkboxChange={checkboxChange}
          checkedBookIDS={checkedBookIDS}
          profileOrigin
        />
      </View>
    </View>
  );
};

export default Favorite;
