import React from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import SocialAuth from './SocialAuth';
import { formStyle } from '../../styles';
import CustomText from '../../components/common/CustomText';
import { LOGIN_ROUTE } from '../../settings';
import NavigationService from '../../base/NavigationService';

const AuthSelect = ({ triggerSocialAuth }) => {
  const navigateToAuthScreen = (type) => {
    return () => NavigationService.navigate(type);
  };

  return (
    <View style={formStyle.container}>
      <SocialAuth
        navigateTO={navigateToAuthScreen}
        triggerSocialAuth={triggerSocialAuth}
      />
      <TouchableWithoutFeedback
        style={formStyle.customAuth}
        onPress={navigateToAuthScreen(LOGIN_ROUTE)}
      >
        <CustomText style={formStyle.customAuthText}>
          Already have an account? Log In
        </CustomText>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AuthSelect;
