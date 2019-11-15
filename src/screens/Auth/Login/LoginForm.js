import React, { useRef } from 'react';
import { Button, Input } from 'react-native-elements';
import { View } from 'react-native';

import { formStyle } from '../../../styles';
import {
  LOGIN_TITLE, NEXT_TYPE, NONE, OUTLINE_TYPE, PASSWORD_LABEL,
  PASSWORD_TYPE, USERNAME_LABEL, USERNAME_TYPE,
} from '../../../settings';

const LoginForm = (props) => {
  const {
    textChangeHandler,
    formErrors: { username: usernameError, password: passwordError },
    handleFormSubmit, loading, handleBlur
  } = props;

  const passwordRef = useRef(null);

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Input
          autoFocus={true}
          autoCapitalize={NONE}
          errorMessage={usernameError && usernameError[0]}
          errorStyle={formStyle.errorStyle}
          inputStyle={formStyle.formInputStyle}
          label={USERNAME_LABEL}
          labelStyle={formStyle.formLabel}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          onChangeText={(username) => textChangeHandler({
            name: USERNAME_TYPE,
            value: username
          })}
          onBlur={() => handleBlur(USERNAME_TYPE)}
          returnKeyType={NEXT_TYPE}
          style={{ marginBottom: 15, }}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Input
          autoCapitalize={NONE}
          errorMessage={passwordError && passwordError[0]}
          errorStyle={formStyle.errorStyle}
          inputStyle={formStyle.formInputStyle}
          label={PASSWORD_LABEL}
          labelStyle={formStyle.formLabel}
          onChangeText={(password) => textChangeHandler({
            name: PASSWORD_TYPE,
            value: password
          })}
          onBlur={() => handleBlur(PASSWORD_TYPE)}
          ref={passwordRef}
          secureTextEntry
        />
      </View>
      <Button
        title={LOGIN_TITLE}
        type={OUTLINE_TYPE}
        buttonStyle={formStyle.customAuthAction}
        titleStyle={formStyle.customAuthActionText}
        onPress={handleFormSubmit}
        loading={loading}
        disabled={loading}
      />
    </View>
  );
};

export default LoginForm;
