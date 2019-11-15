import React from 'react';
import { ActivityIndicator } from 'react-native';

import { appRootStyle } from '../../styles';
import { BLACK_1, ICON_LARGE } from '../../settings';

const Spinner = props => {
  return (
    <ActivityIndicator
      color={BLACK_1}
      style={[{ opacity: 1.0, }, appRootStyle.container]}
      animating={true}
      size={props.size || ICON_LARGE}
      {...props}
    />
  );
};

export default Spinner;
