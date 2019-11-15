import * as React from 'react';
import { Text } from 'react-native';

import { FontContext } from '../../contexts';

const CustomText = props => {
  const { children, style } = props;
  const context = React.useContext(FontContext);
  const allStyles = [
    {
      fontFamily: context.fontFamily, fontSize: 16,
    },
    style || {}
  ];
  const allProps = Object.assign({}, props, { style: allStyles });

  return (
    <Text
      {...allProps}
    >
      {children}
    </Text>
  );
};

export default CustomText;
