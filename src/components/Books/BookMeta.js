import React from 'react';
import { Image, Rating, } from 'react-native-elements';
import { View, TouchableWithoutFeedback, } from 'react-native';

import { appRootStyle } from '../../styles';
import { CONTAIN, ICON_SMALL } from '../../settings';
import Spinner from '../common/Spinner';
import CustomText from '../common/CustomText';
import { toHTTPS } from '../../utils';

const BookMeta = ({ mainBookMeta, book,
  toggleImageEnlarger, renderAuthors, navigateToRecommended }) => {
  const {
    id, name, image: uri, genre, authors, googleAverageRating,
    averageRating,
  } = book;

  const displayAuthors = renderAuthors(authors);
  const numberOfLines = mainBookMeta ? null : 2;

  return (
    <View style={appRootStyle.bookMetaView}>
      <View style={appRootStyle.bookMetaText}>
        <TouchableWithoutFeedback
          onPress={navigateToRecommended(id, mainBookMeta)}
        >
          <CustomText
            style={[mainBookMeta && { fontSize: 18 }, appRootStyle.bookTitle]}
            numberOfLines={numberOfLines}
          >
            {name}
          </CustomText>
        </TouchableWithoutFeedback>
        <CustomText
          style={appRootStyle.bookAuthor}
        >
          {genre}
        </CustomText>
        <CustomText
          style={appRootStyle.bookAuthor}
        >
          {displayAuthors}
        </CustomText>
        {mainBookMeta &&
          <Rating
            readonly
            ratingCount={5}
            imageSize={20}
            startingValue={googleAverageRating || averageRating}
            style={{ marginTop: 20, marginLeft: 0, }}
          />
        }
      </View>

      <TouchableWithoutFeedback
        onPress={toggleImageEnlarger(uri)}
      >
        <View style={[{ width: '30%', marginLeft: -15, }, !mainBookMeta && {
          marginLeft: 15,
        }]}>
          <Image
            resizeMode={CONTAIN}
            source={{ uri: toHTTPS(uri) }}
            style={[appRootStyle.bookMetaImage, !mainBookMeta && {
              width: '100%', height: 100,
            }]}
            PlaceholderContent={<Spinner size={ICON_SMALL} />}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default BookMeta;
