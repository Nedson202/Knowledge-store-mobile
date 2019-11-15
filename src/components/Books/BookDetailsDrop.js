import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-elements';

import AppModal from '../Modal';
import Spinner from '../common/Spinner';
import Icon from '../common/Icon';
import CustomText from '../common/CustomText';

import { toHTTPS } from '../../utils';
import {
  WHITE_1, transparent, CONTAIN, REMOVE_FAVORITES_LABEL, ADD_FAVORITES,
  SHARE_ICON, HEART_ICON, EMPTY_HEART_ICON
} from '../../settings';
import { appRootStyle } from '../../styles';

const BookDetailsDropMenu = (props) => {
  const {
    modalVisible, toggleFavorite, isFavorite,
    toggleDropDown, book: { image }, isAuthenticated
  } = props;
  const favoriteLabel = isFavorite ? REMOVE_FAVORITES_LABEL : ADD_FAVORITES;
  const favoriteIcon = isFavorite ? HEART_ICON : EMPTY_HEART_ICON;

  const favoriteOption = isAuthenticated && (
    <TouchableWithoutFeedback
      onPress={toggleFavorite}
    >
      <View style={appRootStyle.detailsModalItem}>
        <View style={appRootStyle.detailsModalIcon}>
          <Icon name={favoriteIcon} color={WHITE_1} />
        </View>
        <CustomText style={appRootStyle.detailsModalText}>
          {favoriteLabel}
        </CustomText>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <AppModal
      modalVisible={modalVisible}
      toggleModal={toggleDropDown}
      customStyles={{ backgroundColor: transparent, }}
    >
      <Image
        resizeMode={CONTAIN}
        source={{ uri: toHTTPS(image) }}
        style={appRootStyle.detailsModalImage}
        PlaceholderContent={<Spinner />}
      />
      <View style={appRootStyle.detailsModalItem}>
        <View style={appRootStyle.detailsModalIcon}>
          <Icon name={SHARE_ICON} color={WHITE_1} />
        </View>
        <CustomText style={appRootStyle.detailsModalText}>Share</CustomText>
      </View>
      {favoriteOption}
    </AppModal>
  );
};

export default BookDetailsDropMenu;
