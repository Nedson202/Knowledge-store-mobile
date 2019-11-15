import React from 'react';
import SvgAnimatedLinearGradient
  from 'react-native-svg-animated-linear-gradient';
import { Rect } from 'react-native-svg';

import { viewWidth } from '../../utils';

const UserAvatarLoader = () => (
  <SvgAnimatedLinearGradient width={viewWidth} primaryColor="#f1f1f1">
    <Rect x="20" y="30" rx="4" ry="4" width="90" height="90" />
    <Rect x="140" y="40" rx="8" ry="8" width="240" height="13" />
    <Rect x="140" y="70" rx="4" ry="4" width="180" height="10" />
  </SvgAnimatedLinearGradient>
);

export default UserAvatarLoader;
