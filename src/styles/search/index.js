import { StyleSheet, Platform, StatusBar } from 'react-native';

import { WHITE_1, BLACK_4, BLACK_2, GEORGIA_BOLD, georgia } from '../../settings';

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    backgroundColor: WHITE_1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  browseListView: {
    paddingTop: 20,
  },
  browseListHeader: {
    paddingLeft: 17,
    fontSize: 20,
    fontFamily: GEORGIA_BOLD,
    marginTop: 5,
  },
  browseListItem: {
    borderRadius: 5,
    borderColor: BLACK_4,
    height: 40,
  },
  browseListItemText: {
    fontFamily: georgia,
    fontSize: 15,
    color: BLACK_2,
  },
  bookGenre: {
    fontSize: 20,
    fontFamily: GEORGIA_BOLD,
    textAlign: 'center',
    marginTop: 30,
  },
  searchHistoryView: {
    paddingTop: 30,
    paddingRight: 17,
    paddingBottom: 10,
  },
  recentSearchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  history: {
    paddingLeft: 7,
    paddingTop: 10,
  },
  historyListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  historyListItemLabel: {
    flexDirection: 'row',
  },
  labelIcon: {
    marginRight: 10,
    marginTop: -2,
  },
  closeIcon: {
    marginRight: 3,
  },
});

export default styles;
