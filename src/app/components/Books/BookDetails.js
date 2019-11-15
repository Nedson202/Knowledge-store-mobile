import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView, View, RefreshControl, KeyboardAvoidingView,
} from 'react-native';

import BookDetailsDropMenu from './BookDetailsDrop';
import BookMeta from './BookMeta';
import BookSuggestions from './BookSuggestions';
import { appRootStyle } from '../../styles';
import {
  DETAILS_ROUTE, NO_DESCRIPTION, PADDING, BOOK_ID_PARAM, NO_AUTHOR,
  DETAILS_TITLE, NETWORK_ONLY, REVIEW_LABEL, ADD_REPLY, REPLY,
  ADD_REVIEW, EDIT_REVIEW, LEAVE_REVIEW_LABEL, MORE_ICON,
} from '../../settings';
import Icon from '../common/Icon';
import CustomText from '../common/CustomText';
import ReviewInput from '../Reviews/ReviewInput';
import ImageZoom from '../ImageZoom';

import ReviewList from '../Reviews/ReviewList';
import {
  fetchBook, addToFavorites, addReview, addReply,
  editReview, clientHandler
} from '../../graphql';

import HeaderTitle from '../common/HeaderTitle';
import useAuthSelector from '../CustomHooks/useAuthSelector';
import BookDetailsLoader from '../ContentLoaders/BookDetailsLoader';

const BookDetails = ({ navigation }) => {
  const bookID = navigation.getParam(BOOK_ID_PARAM);

  const [enlargeImage, setEnlargeImage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [retrievedBook, setRetrievedBook] = useState({});
  const [imageUri, setImageUri] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewInputValue, setReviewInputValue] = useState('');
  const [bookLoading, setBookLoading] = useState(true);
  const [addingReview, setAddingReview] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewInputFocus, setReviewInputFocus] = useState(false);
  const [reviewInputDisabled, setReviewInputDisabled] = useState(true);
  const [reviewInputPlaceholder, setRviewInputPlaceholder] = useState(REVIEW_LABEL);
  const [reviewInputType, setReviewInputType] = useState(ADD_REVIEW);
  const [reviewToReply, setReviewToReply] = useState('');
  const [reviewToEdit, setReviewToEdit] = useState('');
  const { isAuthenticated, user } = useAuthSelector();
  const reviewInputRef = useRef(null);

  const mainBookMeta = true;

  useEffect(() => {
    navigation.setParams({
      toggleDropDown: toggleDropDown,
    });

    loadBookOnLoad();
  }, []);

  const toggleDropDown = () => {
    return setModalVisible(!modalVisible);
  };

  const navigateToRecommended = (id, isBookMeta) => {
    return () => {
      if (isBookMeta) {
        return;
      }

      navigation.push(DETAILS_ROUTE, {
        bookID: id,
      });
    };
  };

  const loadBookOnLoad = async () => {
    try {
      const bookResponse = await retrieveBook('');

      if (bookResponse && bookResponse.id) {
        setRetrievedBook(bookResponse);
        setBookLoading(false);
      }
    } catch (error) {
      setBookLoading(false);
      console.error(error);
    }
  };

  const refreshBookDetails = async () => {
    try {
      const bookResponse = await retrieveBook(NETWORK_ONLY);

      if (bookResponse && bookResponse.id) {
        setRefreshing(false);
        setRetrievedBook(bookResponse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveBook = async (fetchPolicy) => {
    try {
      const client = await clientHandler();
      const bookResponse = await client.query({
        query: fetchBook,
        variables: {
          bookId: bookID
        },
        fetchPolicy: fetchPolicy,
      });

      const { data: { book } = {} } = bookResponse;

      return book;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleImageEnlarger = (bookImageURI) => {
    return () => {
      setEnlargeImage(!enlargeImage);
      setImageUri(bookImageURI);
    };
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshBookDetails();
  };

  const handleReviewInputFocus = () => {
    if (reviewInputFocus && reviewInputType === EDIT_REVIEW) {
      setReviewInputValue('');
      setRating(0);
    }

    if (reviewInputFocus && reviewInputType === ADD_REPLY) {
      setRviewInputPlaceholder(LEAVE_REVIEW_LABEL);
    }

    setReviewInputFocus(!reviewInputFocus);
  };

  const triggerReviewEditAction = (reviewId, review, bookRating) => {
    return () => {
      setReviewToEdit(reviewId);
      setReviewInputType(EDIT_REVIEW);
      setReviewInputValue(review);
      setRating(bookRating);
      reviewInputRef.current.focus();
    };
  };

  const triggerReply = (reviewId) => {
    return () => {
      setReviewToReply(reviewId);
      setReviewInputType(ADD_REPLY);
      setRviewInputPlaceholder(REPLY);
      reviewInputRef.current.focus();
    };
  };

  const onFinishRating = (bookRating) => {
    setRating(bookRating);
  };

  const onReviewTextChange = ({ value }) => {
    setReviewInputValue(value);

    if (value.trim()) {
      setReviewInputDisabled(false);
    } else {
      setReviewInputDisabled(true);
    }
  };

  const handleReviewInputSubmit = async () => {
    setAddingReview(true);
    const schema = {
      addReview: handleAddReview,
      addReply: handleReply,
      editReview: handleReviewEdit,
    };

    const client = await clientHandler();
    const action = schema[reviewInputType];

    await action(client);
  };

  const handleAddReview = async (client) => {
    const parseRatingToFloat = rating.toFixed(1);

    if (!rating || !reviewInputValue.trim()) {
      setAddingReview(false);
      return;
    }

    try {
      await client.mutate({
        mutation: addReview,
        variables: {
          bookId: bookID,
          rating: parseRatingToFloat,
          review: reviewInputValue,
        },
        refetchQueries: refetchQuery
      });
      reviewInputRef.current.blur();

      setAddingReview(false);
      setRating(0);
      setReviewInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = async (client) => {
    if (!reviewInputValue.trim()) {
      setAddingReview(false);
      return;
    }

    try {
      await client.mutate({
        mutation: addReply,
        variables: {
          reviewId: reviewToReply,
          reply: reviewInputValue,
        },
        refetchQueries: refetchQuery
      });
      setReviewInputType(ADD_REVIEW);
      setReviewToReply('');
      setAddingReview(false);
      setReviewInputValue('');
      reviewInputRef.current.blur();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewEdit = async (client) => {
    if (!rating || !reviewInputValue.trim()) {
      setAddingReview(false);
      return;
    }

    try {
      await client.mutate({
        mutation: editReview,
        variables: {
          reviewId: reviewToEdit,
          review: reviewInputValue,
          rating: rating,
        },
        refetchQueries: refetchQuery
      });
      setReviewInputType(ADD_REVIEW);
      setReviewToEdit('');
      setAddingReview(false);
      setReviewInputValue('');
      setRating(0);
      reviewInputRef.current.blur();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const client = await clientHandler();

      await client.mutate({
        mutation: addToFavorites,
        variables: {
          bookId: bookID,
        },
        refetchQueries: refetchQuery
      });
    } catch (error) {
      console.error(error);
    }
  };

  const refetchQuery = async () => {
    await onRefresh();
  };

  const renderAuthors = (authors) => {
    if (authors.length === 0) {
      const authorNotSpecified = NO_AUTHOR;
      return authorNotSpecified;
    }

    const displayAuthors = authors.map(author => {
      let authorDisplay = `${author} `;
      if (authors.length > 1) {
        authorDisplay = `${author}, `;
      }
      return authorDisplay;
    });

    return displayAuthors;
  };

  const renderBookDescription = ({ description = NO_DESCRIPTION }) => {
    return (
      <View style={appRootStyle.bookDescription}>
        <CustomText
          style={appRootStyle.bookDescriptionText}
        >
          {description}
        </CustomText>
      </View>
    );
  };

  if (bookLoading) {
    return <BookDetailsLoader />;
  }

  return (
    <KeyboardAvoidingView behavior={PADDING} enabled style={{ flex: 1, }}>
      <ScrollView
        contentContainerStyle={appRootStyle.detailsContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <BookMeta
          book={retrievedBook}
          mainBookMeta={mainBookMeta}
          navigateToRecommended={navigateToRecommended}
          renderAuthors={renderAuthors}
          toggleImageEnlarger={toggleImageEnlarger}
        />
        {renderBookDescription(retrievedBook)}
        <BookSuggestions
          book={retrievedBook}
          mainBookMeta={mainBookMeta}
          navigateToRecommended={navigateToRecommended}
          renderAuthors={renderAuthors}
          toggleImageEnlarger={toggleImageEnlarger}
        />
        <ImageZoom
          closeZoom={toggleImageEnlarger}
          imageUri={imageUri}
          isVisible={enlargeImage}
        />
        <ReviewList
          reviews={retrievedBook.reviews}
          reviewInputRef={reviewInputRef}
          toggleImageEnlarger={toggleImageEnlarger}
          triggerReplyAction={triggerReply}
          triggerReviewEditAction={triggerReviewEditAction}
          user={user}
        />
      </ScrollView>
      <ReviewInput
        handleReviewInputSubmit={handleReviewInputSubmit}
        handleFocusChange={handleReviewInputFocus}
        loading={addingReview}
        onFinishRating={onFinishRating}
        onReviewTextChange={onReviewTextChange}
        placeholder={reviewInputPlaceholder}
        reviewInputValue={reviewInputValue}
        rating={rating}
        reviewInputFocus={reviewInputFocus}
        reviewInputRef={reviewInputRef}
        reviewInputDisabled={reviewInputDisabled}
      />
      <BookDetailsDropMenu
        book={retrievedBook}
        isAuthenticated={isAuthenticated}
        isFavorite={retrievedBook.isFavorite}
        modalVisible={modalVisible}
        toggleDropDown={toggleDropDown}
        toggleFavorite={toggleFavorite}
      />
    </KeyboardAvoidingView >
  );
};

BookDetails.navigationOptions = ({ navigation }) => {
  const { params = {} } = navigation.state;
  return {
    headerBackTitle: null,
    headerTitle: (
      <HeaderTitle
        title={DETAILS_TITLE}
      />
    ),
    headerRight: (
      <Icon
        style={appRootStyle.menuIcon}
        name={MORE_ICON}
        onPress={() => params.toggleDropDown()}
      />
    ),
    headerStyle: {
      elevation: 0,
    },
  };
};

export default BookDetails;
