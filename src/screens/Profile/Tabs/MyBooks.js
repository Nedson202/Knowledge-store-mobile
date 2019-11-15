import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { appRootStyle } from '../../../styles';
import BookList from '../../../components/Books';
import { clientHandler, fetchUsersBooks } from '../../../graphql';
import CustomText from '../../../components/common/CustomText';
import { getTokenFromStorage } from '../../../utils';

import BooksLoader from '../../../components/ContentLoaders/BooksLoader';
import useAuthSelector from '../../../components/CustomHooks/useAuthSelector';

const MyBooks = () => {
  const [retrievingBooks, setRetrievingBooks] = useState(true);
  const [books, setBooks] = useState([]);
  const { auth } = useAuthSelector();

  useEffect(() => {
    retrieveUserBooks();
  }, []);

  const retrieveUserBooks = async () => {
    const { isAuthenticated: isUserAuthenticated } = auth;

    if (!isUserAuthenticated) {
      return;
    }

    let allBooks = books;
    const token = await getTokenFromStorage();
    const client = await clientHandler();
    const retrievedBooks = await client.query({
      query: fetchUsersBooks,
      variables: {
        token: `Bearer ${token}`,
      },
    });

    const { data: { usersBooks } } = retrievedBooks;

    if (usersBooks) {
      allBooks = [...books, ...usersBooks];
    }

    setRetrievingBooks(false);
    setBooks(allBooks);
  };

  const renderNotFound = () => {
    return (
      <View style={appRootStyle.container}>
        <CustomText>
          You have not added any book yet.
        </CustomText>
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
    <ScrollView>
      <BookList
        bookList={books}
        profileOrigin
      />
    </ScrollView>
  );
};

export default MyBooks;
