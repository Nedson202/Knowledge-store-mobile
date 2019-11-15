import * as React from 'react';
import { Button, Input } from 'react-native-elements';
import { View, KeyboardAvoidingView } from 'react-native';

import { formStyle } from '../../../styles';
import {
  OUTLINE_TYPE, PADDING, OLD_PASSWORD_LABEL, NEW_PASSWORD_LABEL,
  CONFIRM_PASSWORD_LABEL, CHANGE_PASSWORD_LABEL,
} from '../../../settings';

const ChangePassword = () => {
  return (
    <KeyboardAvoidingView style={formStyle.container} behavior={PADDING} enabled>
      <View>
        <View style={{ marginBottom: 20 }}>
          <Input
            label={OLD_PASSWORD_LABEL}
            labelStyle={formStyle.formLabel}
            inputStyle={formStyle.formInputStyle}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Input
            label={NEW_PASSWORD_LABEL}
            labelStyle={formStyle.formLabel}
            inputStyle={formStyle.formInputStyle}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Input
            label={CONFIRM_PASSWORD_LABEL}
            labelStyle={formStyle.formLabel}
            inputStyle={formStyle.formInputStyle}
          />
        </View>
        <Button
          title={CHANGE_PASSWORD_LABEL}
          type={OUTLINE_TYPE}
          buttonStyle={formStyle.customAuthAction}
          titleStyle={formStyle.customAuthActionText}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
