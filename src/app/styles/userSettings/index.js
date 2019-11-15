import { StyleSheet, } from 'react-native';

import { GREY_2, GEORGIA_BOLD, } from '../../settings';

const styles = StyleSheet.create({
  settingItem: {
    marginTop: 15,
    paddingLeft: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: GREY_2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingItemText: {
    fontFamily: GEORGIA_BOLD,
  },
});

export default styles;
