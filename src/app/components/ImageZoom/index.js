import * as React from 'react';
import { Image } from 'react-native-elements';

import AppModal from '../Modal';
import Spinner from '../common/Spinner';

import { CONTAIN, transparent, } from '../../settings';
import { toHTTPS } from '../../utils';
import { appRootStyle } from '../../styles';

const ImageZoom = props => {
  const { imageUri, isVisible, closeZoom } = props;

  return (
    <AppModal
      modalVisible={isVisible}
      toggleModal={closeZoom()}
      customStyles={{ backgroundColor: transparent, }}
    >
      <Image
        resizeMode={CONTAIN}
        source={{ uri: toHTTPS(imageUri) }}
        style={appRootStyle.detailsModalImage}
        PlaceholderContent={<Spinner />}
      />
    </AppModal>
  );
};

export default ImageZoom;
