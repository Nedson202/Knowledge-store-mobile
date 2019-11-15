import React from 'react';
import { Image, Rating } from 'react-native-elements';
import { TouchableWithoutFeedback, View } from 'react-native';

import Spinner from '../common/Spinner';
import CustomText from '../common/CustomText'
  ;
import { COVER, ICON_SMALL, YELLOW_1, YELLOW_2 } from '../../settings';
import reviewStyles from '../../styles/base/reviews/reviewStyles';
import { timeParser, toHTTPS } from '../../utils';

const ReviewCard = (props) => {
  const {
    review: {
      id, review: reviewMessage, reviewer, rating, updatedAt,
      replies, userId
    },
    review, toggleImageEnlarger, triggerReplyAction, user,
    triggerReviewEditAction
  } = props;

  const parseDateTime = (time) => {
    try {
      const timeReviewed = timeParser(time);

      return timeReviewed;
    } catch (error) {
      console.error(error);
    }
  };

  const editAction = () => {
    if (user.id !== userId) {
      return;
    }

    return (
      <TouchableWithoutFeedback
        onPress={triggerReviewEditAction(id, reviewMessage, rating)}
      >
        <CustomText style={reviewStyles.editAction}>Edit</CustomText>
      </TouchableWithoutFeedback>
    );
  };

  const renderReviewAvatar = ({ picture, avatarColor, replier }) => {
    const username = reviewer || replier || '';

    if (picture) {
      return (
        <TouchableWithoutFeedback
          onPress={toggleImageEnlarger(picture)}
        >
          <Image
            resizeMode={COVER}
            source={{ uri: toHTTPS(picture) }}
            style={reviewStyles.reviewerImage}
            PlaceholderContent={<Spinner size={ICON_SMALL} />}
          />
        </TouchableWithoutFeedback>
      );
    }

    const initials = username.charAt(0).toUpperCase();

    return (
      <View
        style={[reviewStyles.reviewerImage, { backgroundColor: avatarColor }]}
      >
        <CustomText style={reviewStyles.initials}>{initials}</CustomText>
      </View>
    );
  };

  const renderReplies = () => {
    if (!replies.length) {
      return <View />;
    }

    const mapReplies = replies.map(value => {
      const { id: replyID, replier, reply, updatedAt: replyUpdatedAt } = value;

      return (
        <View key={replyID} style={{ marginTop: 30, marginLeft: '18%', width: '82%', }}>
          <View style={reviewStyles.reviewGrid}>
            {renderReviewAvatar(value)}

            <View style={{ width: '80%', }}>
              <CustomText style={reviewStyles.reviewer}>{replier}</CustomText>
              <CustomText style={{ marginTop: 15, }}>
                {reply}
              </CustomText>
              <CustomText style={reviewStyles.replyTime}>
                {parseDateTime(replyUpdatedAt)}
              </CustomText>
            </View>
          </View>
        </View>
      );
    });

    return mapReplies;
  };

  return (
    <View style={{ marginBottom: 30, }}>
      <View style={reviewStyles.reviewGrid}>
        {renderReviewAvatar(review)}

        <View style={{ width: '82%', }}>
          <View style={{ flexDirection: 'row', }}>
            <CustomText style={reviewStyles.reviewer}>{reviewer}</CustomText>
            <Rating
              ratingCount={5}
              imageSize={18}
              startingValue={rating}
              ratingColor={YELLOW_1}
              ratingBackgroundColor={YELLOW_2}
              readonly
            />
          </View>

          <CustomText style={{ marginTop: 10, }}>
            {reviewMessage}
          </CustomText>

          <View style={{ marginTop: 15, flexDirection: 'row' }}>
            {editAction()}
            <TouchableWithoutFeedback
              onPress={triggerReplyAction(id)}
            >
              <CustomText style={{ fontSize: 14, }}>Reply</CustomText>
            </TouchableWithoutFeedback>
            <CustomText style={reviewStyles.reviewTime}>
              {parseDateTime(updatedAt)}
            </CustomText>
          </View>
        </View>
      </View>

      {renderReplies()}
    </View >
  );
};

export default ReviewCard;
