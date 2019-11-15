import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import UserAvatar from '../../screens/Profile/TabsComponents/UserAvatar';
import {
  OUTLINE_TYPE, CHANGE_PHOTO_LABEL, REMOVE_PHOTO_LABEL
} from '../../settings';
import { profileStyles } from '../../styles';
import Spinner from '../common/Spinner';

const UserImageUpload = (props) => {
  const {
    image, pickImage, user, toggleRemovePhotoModal,
    uploadingPicture
  } = props;
  const { picture } = user;
  let removePictureButton = null;

  if (picture) {
    removePictureButton = (
      <Button
        title={REMOVE_PHOTO_LABEL}
        type={OUTLINE_TYPE}
        titleStyle={profileStyles.photoButtonTitle}
        buttonStyle={profileStyles.photoButton}
        onPress={toggleRemovePhotoModal}
      />
    );
  }

  if (image) {
    user.picture = image.uri;
  }

  return (
    <View style={profileStyles.photoUploadView}>
      <UserAvatar
        user={user}
        customStyles={profileStyles.customAvatar}
      />
      <View style={profileStyles.photoButtonsView}>
        <Button
          title={CHANGE_PHOTO_LABEL}
          type={OUTLINE_TYPE}
          onPress={pickImage}
          titleStyle={profileStyles.photoButtonTitle}
          buttonStyle={profileStyles.photoButton}
        />
        {removePictureButton}
        {uploadingPicture && <Spinner />}
      </View>
    </View>
  );
};

export default UserImageUpload;
