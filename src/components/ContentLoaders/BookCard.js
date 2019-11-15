import React from 'react';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';

const BookCard = () => (
  <SvgAnimatedLinearGradient height={170} width={150} primaryColor="#f3f3f3">
    <Rect x="0" y="0" rx="3" ry="3" width="170" height="150" />
  </SvgAnimatedLinearGradient>
);

export default BookCard;
