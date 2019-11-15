import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { ICON_25 } from '../../settings';

const CombinedIcon = ({ name, ...props }) => {
  let logoName = `ios-${name}`;

  if (name && name.startsWith('logo')) {
    logoName = name;
  }

  return (
    <Icon
      name={logoName}
      {...props}
      size={props.size || ICON_25}
      light
    />
  );
};

export default CombinedIcon;
