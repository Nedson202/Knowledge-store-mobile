import React from 'react';
import {
  createStackNavigator, createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

import Main from './Main';
import Icon from '../components/common/Icon';
import BookDetails from '../components/Books/BookDetails';

import Search from '../screens/Search';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import ProfileTab from '../screens/Profile';
import SearchResult from '../screens/Search/SearchResult';
import UserSettings from '../screens/UserSettings';
import ResetPassword from '../screens/Auth/ResetPassword';
import VerifyOTP from '../screens/Auth/Verification';
import ForgotPassword from '../screens/Auth/ForgotPassword';

import {
  INITIAL_ROUTE_NAME, TAB_BAR_ROUTES, INACTIVE_TINT_COLOR, DETAILS_ROUTE,
  ICON_30, BLACK_2
} from '../settings';

const hideTabBar = (navigation, view) => {
  const { routes, index } = navigation.state;
  let tabBarVisible = true;
  let routeName = routes[index].routeName;

  if (routeName == view) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const HomeStack = createStackNavigator({
  Books: Main,
  BookDetails: BookDetails,
});

const SearchStack = createStackNavigator({
  Search: Search,
  SearchResult: SearchResult,
});

const ProfileStack = createStackNavigator({
  UserDashboard: ProfileTab,
  BookDetailsProfileOrigin: BookDetails,
});

const AuthSack = createStackNavigator({
  Login: Login,
  VerifyOTP: VerifyOTP,
  ForgotPassword: ForgotPassword,
  Signup: Signup,
  ResetPassword: ResetPassword,
});

const SettingsStack = createStackNavigator({
  Settings: UserSettings,
});

HomeStack.navigationOptions = ({ navigation }) => {
  return hideTabBar(navigation, DETAILS_ROUTE);
};

ProfileStack.navigationOptions = ({ navigation }) => {
  return hideTabBar(navigation, `${DETAILS_ROUTE}ProfileOrigin`);
};

export default createAppContainer(createBottomTabNavigator(
  {
    Books: HomeStack,
    Search: SearchStack,
    Profile: ProfileStack,
    Settings: SettingsStack,
    Auth: AuthSack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        let icon;
        const { routeName } = navigation.state;
        const { books, search, profile, settings } = TAB_BAR_ROUTES;

        switch (routeName) {
          case books.route:
            icon = books.icon;
            break;
          case search.route:
            icon = search.icon;
            break;
          case profile.route:
            icon = profile.icon;
            break;
          case settings.route:
            icon = settings.icon;
            break;
        }

        if (icon) {

          return <Icon
            name={icon}
            size={ICON_30}
            color={tintColor}
          />;
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      initialRouteName: INITIAL_ROUTE_NAME,
      activeTintColor: BLACK_2,
      inactiveTintColor: INACTIVE_TINT_COLOR,
      swipeEnabled: false,
      style: {
        marginRight: '-30%'
      }
    },
    headerBackTitle: null,
    animationEnabled: true,
    lazy: true,
  }
));
