import { StyleSheet } from 'react-native';

import { GEORGIA_BOLD, BLACK_2, WHITE_1, } from '../../../settings';
import { viewWidth } from '../../../utils';


const bookStyles = StyleSheet.create({
  // Book list
  bookListHeader: {
    marginBottom: 25,
  },
  bookListItem: {
    justifyContent: 'flex-end',
  },
  bookListImage: {
    height: 200,
    borderRadius: 5,
    width: '100%',
  },
  browseListItemTitle: {
    fontSize: 17,
  },

  // Book details
  bookMetaView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
    width: '100%',
  },
  bookMetaText: {
    width: '70%',
  },
  detailsContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  bookMetaImage: {
    width: '100%',
    height: 150,
    marginTop: 25,
    borderRadius: 1,
  },
  bookTitle: {
    fontFamily: GEORGIA_BOLD,
    marginTop: 15,
  },
  bookAuthor: {
    marginTop: 5,
    letterSpacing: 0.5,
  },
  bookDescription: {
    textAlign: 'center',
    marginBottom: 25,
  },
  bookDescriptionText: {
    marginTop: 15,
    letterSpacing: 1.2,
    color: BLACK_2,
  },
  detailsModalImage: {
    // width: '100%',
    marginLeft: -19,
    width: viewWidth,
    height: 300,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  detailsModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: 30,
  },
  detailsModalIcon: {
    width: '10%',
    marginRight: 15,
  },
  detailsModalText: {
    color: WHITE_1,
    fontFamily: GEORGIA_BOLD,
    width: '90%',
    fontSize: 18,
  },
  suggestionHeader: {
    fontSize: 22,
    fontFamily: GEORGIA_BOLD,
  },
  reviewInput: {
    marginTop: 5,
    marginLeft: -7,
  },
  reviewInputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -20,
  }
});

export default bookStyles;
