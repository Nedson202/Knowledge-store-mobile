import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import { WHITE_1 } from '../../settings';

const AppModal = (props) => {
  const { children, modalVisible, toggleModal, customStyles } = props;

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={toggleModal}
    >
      <View style={[{ backgroundColor: WHITE_1, }, customStyles,]}>
        {children}
      </View>
    </ Modal>
  );
};

export default AppModal;
