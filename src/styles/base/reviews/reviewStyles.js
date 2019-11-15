import { StyleSheet } from 'react-native';

import { BLACK_2, BLACK_3, WHITE_1, GREY_2, GEORGIA_BOLD } from '../../../settings';

const reviewStyles = StyleSheet.create({
  sendButton: {
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
    marginRight: 0,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    alignContent: 'center',
    borderColor: BLACK_2,
  },
  reviewerImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  reviewTime: {
    fontSize: 14,
    color: BLACK_3,
    marginLeft: 35,
  },
  editAction: {
    fontSize: 14,
    color: BLACK_3,
    marginRight: 35,
  },
  replyTime: {
    fontSize: 14,
    marginTop: 10,
    color: BLACK_3,
    flexDirection: 'row',
  },
  reviewer: {
    fontFamily: GEORGIA_BOLD,
    textTransform: 'capitalize',
    marginRight: 35,
  },
  reviewList: {
    marginTop: 30,
    marginLeft: 5,
    marginBottom: 20,
    borderTopColor: GREY_2,
    paddingTop: 25,
  },
  reviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  initials: {
    color: WHITE_1,
    fontFamily: GEORGIA_BOLD,
    textAlign: 'center',
    lineHeight: 50,
  }
});

export default reviewStyles;
