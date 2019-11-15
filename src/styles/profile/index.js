import { StyleSheet } from 'react-native';

import { WHITE_1, BLACK_2, BLACK_4, GEORGIA_BOLD, georgia } from '../../settings';

const flexStyles = {
  flexDirection: 'row',
  justifyContent: 'center',
};

const horizontalCenterFlex = {
  flexDirection: 'column',
  justifyContent: 'center',
};

const profileStyles = StyleSheet.create({
  tabBarView: {
    textTransform: 'capitalize',
    backgroundColor: WHITE_1,
    elevation: 0,
    borderColor: 'transparent',
    borderBottomWidth: 1,
  },
  indicatorStyle: {
    backgroundColor: BLACK_2,
    height: 1,
    paddingBottom: 0,
  },
  userAvatarView: {
    width: '30%',
  },
  userAvatar: {
    width: 90,
    height: 90,
    borderRadius: 5,
  },
  customAvatar: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  userDetailsView: {
    marginLeft: 17,
    marginRight: 17,
    marginTop: 40,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userDetails: {
    ...horizontalCenterFlex,
    width: '70%',
  },
  username: {
    textTransform: 'capitalize',
    fontFamily: GEORGIA_BOLD,
    marginBottom: 5,
  },
  initials: {
    color: WHITE_1,
    fontFamily: GEORGIA_BOLD,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 90,
  },
  initialsAvatar: {
    ...flexStyles,
    width: 90,
    height: 90,
    borderRadius: 5,
    alignContent: 'center',
  },
  addBookText: {
    fontFamily: georgia,
    color: BLACK_2,
    fontSize: 15,
    textAlign: 'center',
  },
  addBookButton: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: BLACK_4,
    width: 150,
    borderRadius: 5,
  },
  editProfile: {
    marginTop: 20,
  },
  photoUploadView: {
    ...flexStyles,
    marginBottom: 20,
  },
  photoButtonsView: {
    ...horizontalCenterFlex,
    marginLeft: 15,
  },
  photoButton: {
    marginBottom: 10,
    borderColor: BLACK_4,
  },
  photoButtonTitle: {
    fontFamily: georgia,
    fontSize: 15,
    color: BLACK_2,
  },
  favoritesContainer: {
    display: 'flex',
    marginTop: 15,
  },
  removeFavorites: {
    marginTop: -20,
  },
  removeFavoritesButtonView: {
    zIndex: 10,
    backgroundColor: WHITE_1,
  },
  removeFavoritesButton: {
    borderRadius: 5,
    marginLeft: '25%',
    borderColor: BLACK_2,
    width: '50%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  removeFavoritesButtonText: {
    fontFamily: georgia,
    color: BLACK_2,
    fontSize: 16,
  },
  favoritesActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '10%',
    paddingRight: '10%',
    zIndex: 10,
    backgroundColor: WHITE_1,
  },
  actionButton: {
    borderRadius: 5,
    borderColor: BLACK_2,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  }
});

export default profileStyles;
