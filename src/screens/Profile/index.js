import React, { useState } from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { AuthSession } from 'expo';
import { useDispatch } from 'react-redux';

import Favorite from './Tabs/Favorite';
import MyBooks from './Tabs/MyBooks';
import EditProfile from './Tabs/EditProfile';
import UserAvatar from './TabsComponents/UserAvatar';

import CustomText from '../../components/common/CustomText';
import useAuthSelector from '../../components/CustomHooks/useAuthSelector';
import UserAvatarLoader from '../../components/ContentLoaders/UserAvatarLoader';

import { profileStyles, searchStyle } from '../../styles';
import {
  PROFILE_TAB_ROUTES, GEORGIA_BOLD, INACTIVE_TINT_COLOR, VERIFY_OTP_ROUTE,
  PRODUCTION, BLACK_1
} from '../../settings';
import AuthSelect from '../Auth/AuthSelect';

import NavigationService from '../../navigation';
import { getTokenFromStorage, setTokenToStorage } from '../../utils';

import { ENVIRONMENT, REACT_APP_NODE_ENV } from '../../../config';

import { setCurrentUser } from '../../redux/actions/userActions';
import { clientHandler, decodeToken } from '../../graphql';

const ProfileTab = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState(PROFILE_TAB_ROUTES);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isScreenLoading, setIsScreenLoading] = useState(true);
  const { auth } = useAuthSelector();
  const dispatch = useDispatch();

  const screenFocused = async () => {
    setIsScreenLoading(true);

    const { isAuthenticated: isUserAuthenticated, user } = auth;
    let isUserVerified = 'false';

    if (isUserAuthenticated) {
      isUserVerified = user.isVerified;
    }

    try {
      const token = await getTokenFromStorage();
      const parseVerifiedStatus = JSON.parse(isUserVerified);

      if (isUserAuthenticated && !parseVerifiedStatus) {
        return NavigationService.navigate(VERIFY_OTP_ROUTE, {
          verificationType: 'verifyEmail',
          token
        });
      } else {
        setIsVerified(parseVerifiedStatus);
        setIsAuthenticated(isUserAuthenticated);
        setIsScreenLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const triggerSocialAuth = (type) => async () => {
    let redirectUrl = ENVIRONMENT.development;

    if (REACT_APP_NODE_ENV && REACT_APP_NODE_ENV.match(PRODUCTION)) {
      redirectUrl = ENVIRONMENT.production;
    }

    const fullRedirectUrl = `${redirectUrl}/auth/${type}`;

    await handleOpenWithWebBrowser(fullRedirectUrl);
  };

  const handleOpenWithWebBrowser = async (fullRedirectUrl) => {
    let redirectUrl = AuthSession.getRedirectUrl();

    let result = await AuthSession.startAsync({
      authUrl: `${fullRedirectUrl}?redirect_url=${redirectUrl}`
    });

    completeSocialAuth(result);
  };

  const completeSocialAuth = async (sessionResult) => {
    const { params: { token } } = sessionResult;

    if (!token) {
      return;
    }

    await setTokenToStorage(token);
    const userData = await decodeAuthToken(token);

    dispatch(setCurrentUser(userData));
    setIsVerified(true);
    setIsAuthenticated(true);
  };

  const decodeAuthToken = async (token) => {
    const client = await clientHandler();
    const decodedData = await client.query({
      query: decodeToken,
      token
    });

    const { data: { decodeToken: decodedToken } } = decodedData;
    const userData = decodedToken[0];

    return userData;
  };

  const renderUserDetails = () => {
    if (isScreenLoading) {
      return <UserAvatarLoader />;
    }

    const { user } = auth;

    if (user) {
      const { username, email } = user;
      return (
        <View style={profileStyles.userDetailsView}>
          <UserAvatar
            user={user}
          />
          <View style={profileStyles.userDetails}>
            <CustomText style={profileStyles.username}>{username}</CustomText>
            <CustomText>{email}</CustomText>
          </View>
        </View>
      );
    }
  };

  const renderTabBar = (props) => {
    return (
      <TabBar
        style={profileStyles.tabBarView}
        labelStyle={{ fontSize: 13, fontFamily: GEORGIA_BOLD }}
        inactiveColor={INACTIVE_TINT_COLOR}
        activeColor={BLACK_1}
        {...props}
        indicatorStyle={profileStyles.indicatorStyle}
      />
    );
  };

  const renderView = () => {
    const navigationState = {
      index,
      routes
    };

    if (isAuthenticated && isVerified) {
      return (
        <SafeAreaView style={searchStyle.androidSafeArea}>
          {renderUserDetails()}
          <TabView
            navigationState={navigationState}
            renderScene={SceneMap({
              books: MyBooks,
              favorite: Favorite,
              editProfile: EditProfile
            })}
            onIndexChange={tabIndex => setIndex(tabIndex)}
            initialLayout={{ width: Dimensions.get('window').width }}
            swipeEnabled={Platform.OS !== 'web'}
            renderTabBar={renderTabBar}
          />
        </SafeAreaView>
      );
    }

    if (!isScreenLoading && !isAuthenticated) {
      return <AuthSelect
        triggerSocialAuth={triggerSocialAuth}
      />;
    }
  };

  return (
    <React.Fragment>
      <NavigationEvents
        onDidFocus={screenFocused}
      />
      {renderView()}
    </React.Fragment>
  );
};

ProfileTab.navigationOptions = {
  header: null,
  headerBackTitle: null,
  headerStyle: {
    elevation: 0
  }
};

export default ProfileTab;
