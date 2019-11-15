import * as React from 'react';
import { CheckBox, Image, } from 'react-native-elements';
import { TouchableWithoutFeedback, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import { appRootStyle } from '../../styles';
import { DETAILS_ROUTE, STRETCH } from '../../settings';
import Spinner from '../common/Spinner';
import CustomText from '../common/CustomText';
import NavigationService from '../../navigation';
import { toHTTPS } from '../../utils';

const BookList = (props) => {
  const {
    infiniteScrollActive, checkboxChange,
    handleInfiniteScroll, bookList, removeFavorites,
    checkedBookIDS, profileOrigin, handlePullRefresh,
    refreshing,
  } = props;

  const navigateToDetails = (id) => {
    let redirectPath = DETAILS_ROUTE;

    if (profileOrigin) {
      redirectPath = `${DETAILS_ROUTE}ProfileOrigin`;
    }

    return () => {
      NavigationService.navigate(redirectPath, {
        bookID: id,
      });
    };
  };

  const renderFooter = () => {
    if (!infiniteScrollActive) return null;

    return (
      <View style={{ marginBottom: 30 }}>
        <Spinner />
      </View>
    );
  };

  const renderBooks = () => {
    if (!bookList.length) {
      return (
        <View>
          <CustomText>Unable to retrieve books. Please try again.</CustomText>
        </View>
      );
    }

    const bookListItem = ({ id, image }) => (
      <React.Fragment key={id}>
        {removeFavorites
          && <CheckBox
            checked={checkedBookIDS.includes(id)}
            onPress={checkboxChange(id)}
          />
        }
        <TouchableWithoutFeedback
          style={appRootStyle.bookListItem}
          onPress={navigateToDetails(id)}
        >
          <View>
            <Image
              resizeMode={STRETCH}
              source={{ uri: toHTTPS(image) }}
              style={appRootStyle.bookListImage}
              PlaceholderContent={<Spinner />}
            />
          </View>
        </TouchableWithoutFeedback>
      </React.Fragment>
    );

    return (
      <FlatGrid
        items={bookList}
        renderItem={({ item }) => bookListItem(item)}
        onEndReached={handleInfiniteScroll}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handlePullRefresh}
        ListFooterComponent={renderFooter}
        spacing={38}
      />
    );
  };

  return (
    <View>
      {renderBooks()}
    </View>
  );
};

export default BookList;
