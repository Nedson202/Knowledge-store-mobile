/* eslint-disable react/no-string-refs */
import React, { useRef } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { formStyle, } from '../../../styles';
import {
  NONE, EMAIL_LABEL, USERNAME_LABEL,
  NEXT_TYPE, OUTLINE_TYPE, USERNAME_TYPE, EMAIL_TYPE, SAVE_PROFILE
} from '../../../settings';

const EditProfileForm = (props) => {
  const {
    loading, textChangeHandler, handleFormSubmit,
    values: { username, email }, disabled,
    formErrors: { username: usernameError, email: emailError },
  } = props;

  const emailRef = useRef(null);

  return (
    <View style={formStyle.container}>
      <View style={{ marginBottom: 25 }}>
        <Input
          autoCapitalize={NONE}
          label={USERNAME_LABEL}
          labelStyle={formStyle.formLabel}
          inputStyle={formStyle.formInputStyle}
          returnKeyType={NEXT_TYPE}
          autoFocus={true}
          errorMessage={usernameError && usernameError[0]}
          errorStyle={formStyle.errorStyle}
          onSubmitEditing={() => {
            emailRef.current.focus();
          }}
          onChangeText={(inputValue) => textChangeHandler({
            name: USERNAME_TYPE,
            value: inputValue
          })}
          defaultValue={username}
        />
      </View>
      <View style={{ marginBottom: 25 }}>
        <Input
          autoCapitalize={NONE}
          label={EMAIL_LABEL}
          labelStyle={formStyle.formLabel}
          inputStyle={formStyle.formInputStyle}
          ref={emailRef}
          errorMessage={emailError && emailError[0]}
          errorStyle={formStyle.errorStyle}
          onChangeText={(inputValue) => textChangeHandler({
            name: EMAIL_TYPE,
            value: inputValue
          })}
          defaultValue={email}
        />
      </View>
      <Button
        title={SAVE_PROFILE}
        type={OUTLINE_TYPE}
        buttonStyle={formStyle.customAuthAction}
        titleStyle={formStyle.customAuthActionText}
        onPress={handleFormSubmit}
        loading={loading}
        disabled={disabled}
      />
    </View>
  );
};

export default EditProfileForm;
