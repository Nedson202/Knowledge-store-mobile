import React from 'react';

import CustomText from './CustomText';
import { globalStyle } from '../../styles';

const HeaderTitle = props => {
  const { title } = props;

  return (
    <CustomText
      style={globalStyle.customText}
    >
      {title}
    </CustomText>
  );
};

export default HeaderTitle;
