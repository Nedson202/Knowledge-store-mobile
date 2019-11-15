import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Spinner from '../../components/common/Spinner';
import { georgia } from '../../settings';
import { decodeToken, clientHandler } from '../../graphql';
import { setCurrentUser } from '../../redux/actions/userActions';

import { FontContext } from '..';

const InitSetupProvider = ({ children }) => {
  const [fontActions, setFontActions] = useState({
    fontLoading: true,
    fontFamily: georgia,
  });
  const [decodingToken, setDecodingToken] = useState(true);
  const dispatch = useDispatch();

  const initFontAndUserAuth = async () => {
    await Font.loadAsync({
      'Georgia': require('../../../../assets/fonts/georgia/georgia.ttf'),
      'Georgia Bold': require('../../../../assets/fonts/georgia/georgiab.ttf'),
      ...Ionicons.font,
    });

    const newFontActions = {
      ...fontActions,
      fontLoading: false,
    };
    const client = await clientHandler();
    const decodedData = await client.query({
      query: decodeToken,
    });

    const { data: { decodeToken: decodedToken } } = decodedData;
    const userData = decodedToken[0];

    dispatch(setCurrentUser(userData));
    setDecodingToken(false);
    setFontActions(newFontActions);
  };

  useEffect(() => {
    initFontAndUserAuth();
  }, []);

  if (fontActions.fontLoading || decodingToken) {
    return (
      <Spinner />
    );
  }

  return (
    <FontContext.Provider
      value={{ ...fontActions }}
    >
      {children}
    </FontContext.Provider>
  );
};

export default InitSetupProvider;
