import * as React from 'react';
import { View } from 'react-native';

import ReviewCard from './ReviewCard';
import reviewStyles from '../../styles/base/reviews/reviewStyles';

const ReviewList = (props) => {
  const { reviews = [], toggleImageEnlarger, triggerReplyAction,
    user, triggerReviewEditAction,
  } = props;

  const renderBookReviews = () => {
    const displayReviews = reviews.map(review => {
      return (
        <ReviewCard
          key={review.id}
          review={review}
          toggleImageEnlarger={toggleImageEnlarger}
          triggerReplyAction={triggerReplyAction}
          triggerReviewEditAction={triggerReviewEditAction}
          user={user}
        />
      );
    });

    return displayReviews;
  };

  return (
    <View style={[
      reviewStyles.reviewList,
      reviews.length && { borderTopWidth: 1, }
    ]}>
      {renderBookReviews()}
    </View>
  );
};

export default ReviewList;
