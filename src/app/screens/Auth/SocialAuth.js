import React from 'react';
import { View } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import { formStyle } from '../../styles';
import {
  SIGNUP_ROUTE, CONTINUE_WITH_FACEBOOK,
  CONTINUE_WITH_GOOGLE, CONTINUE_WITH_EMAIL, FACEBOOK, GOOGLE,
  FACEBOOK_ICON, GOOGLE_PLUS_ICON
} from '../../settings';


const SocialAuth = ({ navigateTO, triggerSocialAuth }) => (
  <View style={formStyle.socialAuthButtons}>
    <SocialIcon
      title={CONTINUE_WITH_FACEBOOK}
      button
      type={FACEBOOK_ICON}
      fontStyle={formStyle.socialAuthButton}
      onPress={triggerSocialAuth(FACEBOOK)}
    />
    <SocialIcon
      title={CONTINUE_WITH_GOOGLE}
      button
      type={GOOGLE_PLUS_ICON}
      fontStyle={formStyle.socialAuthButton}
      onPress={triggerSocialAuth(GOOGLE)}
    />
    <SocialIcon
      title={CONTINUE_WITH_EMAIL}
      button
      light
      fontStyle={formStyle.socialAuthButton}
      onPress={navigateTO(SIGNUP_ROUTE)}
    />
  </View>
);

export default SocialAuth;
