import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import CustomText from '../common/CustomText';

import { GEORGIA_BOLD, WHITE_1 } from '../../settings';

const Toast = ({ showToast, message }) => {
  const [interToast, toggleInterToast] = useState(showToast);

  useEffect(() => {
    if (interToast) {
      setTimeout(() => {
        toggleInterToast(false);
      }, 5000);
    }
  }, [interToast, showToast]);

  const toast = () => {
    if (!interToast) {
      return;
    }

    return (
      <View style={{
        backgroundColor: WHITE_1,
        borderRadius: 40,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

        marginRight: '5%',
        marginLeft: '5%',
        marginTop: 20,
        zIndex: 20,
        position: 'absolute',
        width: '90%',
      }}
      >
        <CustomText style={{ fontFamily: GEORGIA_BOLD, fontSize: 17, paddingTop: 15, paddingBottom: 15, textAlign: 'center', }}>
          {message}
        </CustomText>
      </View>
    );
  };

  return (
    <View>
      {toast()}
    </View >
  );
};

export default Toast;
