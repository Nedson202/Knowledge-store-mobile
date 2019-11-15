import React from 'react';
import { View, } from 'react-native';
import { Button, Input, Rating } from 'react-native-elements';

import Icon from '../common/Icon';
import { formStyle, appRootStyle } from '../../styles';
import { OUTLINE_TYPE, YELLOW_1, YELLOW_2, SEND_ICON } from '../../settings';

const ReviewInput = props => {
  const {
    reviewInputValue, rating, onFinishRating, onReviewTextChange,
    loading, reviewInputFocus, handleFocusChange, reviewInputRef,
    reviewInputDisabled, placeholder, handleReviewInputSubmit,
  } = props;

  const inputFooter = reviewInputFocus && (
    <View style={appRootStyle.reviewInputFooter}>
      <Rating
        fractions={1}
        imageSize={20}
        onFinishRating={onFinishRating}
        ratingColor={YELLOW_1}
        ratingBackgroundColor={YELLOW_2}
        ratingCount={5}
        startingValue={rating}
        style={{ marginTop: 20, paddingLeft: 10 }}
      />
      <Button
        buttonStyle={appRootStyle.sendButton}
        disabled={reviewInputDisabled}
        loading={loading}
        icon={<Icon name={SEND_ICON} />}
        onPress={handleReviewInputSubmit}
        titleStyle={formStyle.customAuthActionText}
        type={OUTLINE_TYPE}
      />
    </View>
  );

  return (
    <View
      style={[appRootStyle.detailsContainer, appRootStyle.reviewInput]}
    >
      <View style={{ marginBottom: 20, }}>
        <Input
          inputStyle={[formStyle.formInputStyle, { maxHeight: 70, }]}
          multiline
          onBlur={handleFocusChange}
          onChangeText={value => onReviewTextChange({
            value
          })}
          onFocus={handleFocusChange}
          placeholder={placeholder}
          ref={reviewInputRef}
          value={reviewInputValue}
        />
      </View>
      {inputFooter}
    </View>
  );
};

export default ReviewInput;
