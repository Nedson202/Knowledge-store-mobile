import React, { useRef } from 'react';
import { Button, Input } from 'react-native-elements';
import { View, } from 'react-native';

import { formStyle } from '../../../styles';
import {
  EMAIL_LABEL, EMAIL_TYPE, NONE, OUTLINE_TYPE, PASSWORD_LABEL, PASSWORD_TYPE,
  SIGNUP_TITLE, USERNAME_LABEL, USERNAME_TYPE,
} from '../../../settings';

const SignupForm = (props) => {
  const {
    textChangeHandler, handleFormSubmit, loading, handleBlur,
    formErrors: {
      username: usernameError,
      email: emailError,
      password: passwordError,
    },
  } = props;

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Input
          autoCapitalize={NONE}
          label={USERNAME_LABEL}
          labelStyle={formStyle.formLabel}
          inputStyle={formStyle.formInputStyle}
          autoFocus={true}
          errorMessage={usernameError && usernameError[0]}
          errorStyle={formStyle.errorStyle}
          onSubmitEditing={() => {
            emailRef.current.focus();
          }}
          onChangeText={(username) => textChangeHandler({
            name: USERNAME_TYPE,
            value: username
          })}
          onBlur={() => handleBlur(USERNAME_TYPE)}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Input
          autoCapitalize={NONE}
          label={EMAIL_LABEL}
          labelStyle={formStyle.formLabel}
          inputStyle={formStyle.formInputStyle}
          ref={emailRef}
          errorMessage={emailError && emailError[0]}
          errorStyle={formStyle.errorStyle}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          onChangeText={(email) => textChangeHandler({
            name: EMAIL_TYPE,
            value: email
          })}
          onBlur={() => handleBlur(EMAIL_TYPE)}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Input
          autoCapitalize={NONE}
          label={PASSWORD_LABEL}
          labelStyle={formStyle.formLabel}
          inputStyle={formStyle.formInputStyle}
          ref={passwordRef}
          errorMessage={passwordError && passwordError[0]}
          errorStyle={formStyle.errorStyle}
          onChangeText={(password) => textChangeHandler({
            name: PASSWORD_TYPE,
            value: password
          })}
          onBlur={() => handleBlur(PASSWORD_TYPE)}
          secureTextEntry
        />
      </View>
      <Button
        title={SIGNUP_TITLE}
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

export default SignupForm;
