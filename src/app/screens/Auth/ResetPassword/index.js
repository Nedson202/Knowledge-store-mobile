import * as React from 'react';
import { Button, Input } from 'react-native-elements';
import { View, KeyboardAvoidingView } from 'react-native';

import { formStyle } from '../../../styles';
import {
  OUTLINE_TYPE, PADDING, RESET_PASSWORD_TITLE, NONE,
  NEW_PASSWORD_LABEL, CONFIRM_PASSWORD_LABEL
} from '../../../settings';
import HeaderTitle from '../../../components/common/HeaderTitle';

export default class ResetPassword extends React.Component {
  static navigationOptions = () => {
    return {
      headerTitle: (
        <HeaderTitle
          title={RESET_PASSWORD_TITLE}
        />
      ),
      headerBackTitle: null,
      headerStyle: {
        elevation: 0,
      },
    };
  };

  render() {
    return (
      <KeyboardAvoidingView style={formStyle.container} behavior={PADDING} enabled>
        <View>
          <View style={{ marginBottom: 20 }}>
            <Input
              autoCapitalize={NONE}
              autoFocus={true}
              label={NEW_PASSWORD_LABEL}
              labelStyle={formStyle.formLabel}
              inputStyle={formStyle.formInputStyle}
              secureTextEntry
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Input
              autoCapitalize={NONE}
              label={CONFIRM_PASSWORD_LABEL}
              labelStyle={formStyle.formLabel}
              inputStyle={formStyle.formInputStyle}
              secureTextEntry
            />
          </View>
          <Button
            title={RESET_PASSWORD_TITLE}
            type={OUTLINE_TYPE}
            buttonStyle={formStyle.customAuthAction}
            titleStyle={formStyle.customAuthActionText}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}
