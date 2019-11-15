
import * as React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';

import Spinner from '../../../components/common/Spinner';
import CustomText from '../../../components/common/CustomText';

import { profileStyles } from '../../../styles';
import { COVER, ICON_SMALL } from '../../../settings';
import { toHTTPS } from '../../../utils';

const UserAvatar = ({ user, customStyles }) => {
  if (user) {
    const { picture, username } = user;
    if (!picture && username) {
      const { avatarColor } = user;
      const initials = user && username.charAt(0).toUpperCase();

      return (
        <View
          style={[
            profileStyles.initialsAvatar,
            { backgroundColor: avatarColor }
          ]}
        >
          <CustomText
            style={profileStyles.initials}
          >
            {initials}
          </CustomText>
        </View>
      );
    }

    return (
      <View style={profileStyles.userAvatarView}>
        <Image
          resizeMode={COVER}
          source={{ uri: toHTTPS(picture) }}
          style={[profileStyles.userAvatar, customStyles]}
          PlaceholderContent={<Spinner size={ICON_SMALL} />}
        />
      </View>
    );
  }
};

export default UserAvatar;
