import React, { useRef } from 'react';
import { Button, Input } from 'react-native-elements';
import { View, } from 'react-native';

import { formStyle } from '../../../styles';
import {
  OUTLINE_TYPE, OTP_BUTTON_TITLE, NEXT_TYPE, PHONE_PAD,
  PHONE_TYPE, TELEPHONE
} from '../../../settings';

const OTPForm = (props) => {
  const {
    textChangeHandler,
    values: {
      code1, code2, code3, code4,
    }, handleOTPVerification, loading,
  } = props;

  const code2Ref = useRef(null);
  const code3Ref = useRef(null);
  const code4Ref = useRef(null);

  return (
    <View>
      <View style={formStyle.otpView}>
        <View style={{ width: 60, }}>
          <Input
            autoFocus={true}
            dataDetectorTypes={PHONE_TYPE}
            inputStyle={formStyle.otpInputStyle}
            keyboardType={PHONE_PAD}
            maxLength={1}
            onChangeText={(inputValue) => {
              const value = inputValue.replace(/[^0-9]/g, '');
              textChangeHandler({
                name: 'code1',
                value
              });
              if (value.trim()) {
                code2Ref.current.focus();
              }
            }}
            textContentType={TELEPHONE}
            returnKeyType={NEXT_TYPE}
            value={code1}
          />
        </View>
        <View style={{ width: 60, }}>
          <Input
            inputStyle={formStyle.otpInputStyle}
            dataDetectorTypes={PHONE_TYPE}
            keyboardType={PHONE_PAD}
            maxLength={1}
            returnKeyType={NEXT_TYPE}
            onChangeText={(inputValue) => {
              const value = inputValue.replace(/[^0-9]/g, '');
              textChangeHandler({
                name: 'code2',
                value
              });
              if (value.trim()) {
                code3Ref.current.focus();
              }
            }}
            textContentType={TELEPHONE}
            ref={code2Ref}
            value={code2}
          />
        </View>
        <View style={{ width: 60, }}>
          <Input
            inputStyle={formStyle.otpInputStyle}
            maxLength={1}
            textContentType={TELEPHONE}
            dataDetectorTypes={PHONE_TYPE}
            keyboardType={PHONE_PAD}
            returnKeyType={NEXT_TYPE}
            onChangeText={(inputValue) => {
              const value = inputValue.replace(/[^0-9]/g, '');
              textChangeHandler({
                name: 'code3',
                value
              });
              if (value.trim()) {
                code4Ref.current.focus();
              }
            }}
            ref={code3Ref}
            value={code3}
          />
        </View>
        <View style={{ width: 60, }}>
          <Input
            inputStyle={formStyle.otpInputStyle}
            maxLength={1}
            textContentType={TELEPHONE}
            dataDetectorTypes={PHONE_TYPE}
            keyboardType={PHONE_PAD}
            ref={code4Ref}
            onChangeText={(inputValue) => {
              const value = inputValue.replace(/[^0-9]/g, '');
              textChangeHandler({
                name: 'code4',
                value
              });
            }}
            value={code4}
          />
        </View>
      </View>
      <Button
        title={OTP_BUTTON_TITLE}
        type={OUTLINE_TYPE}
        buttonStyle={formStyle.customAuthAction}
        titleStyle={formStyle.customAuthActionText}
        onPress={handleOTPVerification}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
};

export default OTPForm;
