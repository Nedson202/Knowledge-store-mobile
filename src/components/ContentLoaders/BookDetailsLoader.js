import React from 'react';
import SvgAnimatedLinearGradient
  from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';

import { viewWidth } from '../../utils';

const BookDetailsLoader = () => {
  const bookMetaLoader = (
    <SvgAnimatedLinearGradient width={viewWidth} primaryColor="#f1f1f1">
      <Rect x="25" y="40" rx="8" ry="8" width="230" height="13" />
      <Rect x="25" y="70" rx="8" ry="8" width="200" height="10" />
      <Rect x="25" y="100" rx="4" ry="4" width="150" height="7" />
      <Rect x="270" y="40" rx="4" ry="4" width="120" height="120" />
    </SvgAnimatedLinearGradient>
  );

  const bookDescription = (
    <SvgAnimatedLinearGradient width={viewWidth} primaryColor="#f1f1f1">
      <Rect x="5%" y="0" rx="8" ry="8" width="90%" height="250" />
    </SvgAnimatedLinearGradient>
  );

  return (
    <React.Fragment>
      {bookMetaLoader}
      {bookDescription}
      {bookMetaLoader}
    </React.Fragment>
  );
};

export default BookDetailsLoader;
