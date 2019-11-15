import { StyleSheet } from 'react-native';

import bookStyles from './books/bookStyles';
import reviewStyles from './reviews/reviewStyles';

import { GEORGIA_BOLD } from '../../settings';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuIcon: {
    paddingRight: 20,
    fontSize: 25,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: GEORGIA_BOLD,
    paddingRight: 17,
    paddingLeft: 17,
    textAlign: 'center',
  },
  catalogue: {
    marginBottom: 45,
  },
  ...bookStyles,
  ...reviewStyles,
});

export default styles;
