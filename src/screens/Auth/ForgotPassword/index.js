import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { KeyboardAvoidingView, View } from 'react-native';

import { formStyle } from '../../../styles';
import HeaderTitle from '../../../components/common/HeaderTitle';
import CustomText from '../../../components/common/CustomText';
import {
  EMAIL_LABEL, EMAIL_TYPE, FORGOT_PASSWORD_TITLE, NONE,
  OUTLINE_TYPE, PADDING, RESET_OTP_TITLE, VERIFY_OTP_ROUTE
} from '../../../settings';
import {
  allFieldsValidation, handleSingleFieldValidation
} from '../../../utils';
import { clientHandler, forgotPassword } from '../../../graphql';
import NavigationService from '../../../navigation';

const ForgotPassword = () => {
  const defaultValues = {
    email: '',
  };
  const [values, setValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onTextChange = ({ name, value }) => {
    const newValues = { ...values };

    newValues[name] = value.trim();
    setValues(newValues);
  };

  const handleBlur = (name) => {
    const { formErrors: newFormErrors } = handleSingleFieldValidation(
      formErrors, { name, value: values[name] }
    );

    setFormErrors(newFormErrors);
  };
  const handleFormSubmit = async () => {
    setLoading(true);
    const client = await clientHandler();
    const { isValid, errors } = allFieldsValidation(
      values, ['username', 'password']
    );

    if (!isValid) {
      setFormErrors(errors);
      setLoading(false);

      return;
    }

    try {
      const forgotPasswordHandler = await client.mutate({
        mutation: forgotPassword,
        variables: {
          ...values
        }
      });
      setLoading(false);

      const {
        data: { forgotPassword: { token } = {} } = {}
      } = forgotPasswordHandler;

      if (token) {
        setValues(defaultValues);
        NavigationService.navigate(VERIFY_OTP_ROUTE, {
          verificationType: 'forgotPasswordRequest',
          token,
        });
      }
    } catch (error) {
      console.log(error);
      setValues(defaultValues);
    }
  };

  const { email: emailError } = formErrors;
  return (
    <KeyboardAvoidingView style={formStyle.container} behavior={PADDING} enabled>
      <View>
        <CustomText style={formStyle.forgotPasswordMsg}>
          Enter the email you&apos;re using for your account below to get password
          reset instructions.
        </CustomText>
        <View style={{ marginBottom: 20 }}>
          <Input
            autoFocus={true}
            autoCapitalize={NONE}
            label={EMAIL_LABEL}
            labelStyle={formStyle.formLabel}
            inputStyle={formStyle.formInputStyle}
            onChangeText={(email) => onTextChange({
              name: EMAIL_TYPE,
              value: email
            })}
            handleBlur={() => handleBlur(EMAIL_TYPE)}
            errorMessage={emailError && emailError[0]}
            errorStyle={formStyle.errorStyle}
          />
        </View>
        <Button
          title={RESET_OTP_TITLE}
          type={OUTLINE_TYPE}
          buttonStyle={formStyle.customAuthAction}
          titleStyle={formStyle.customAuthActionText}
          onPress={handleFormSubmit}
          loading={loading}
          disabled={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

ForgotPassword.navigationOptions = {
  headerTitle: (
    <HeaderTitle
      title={FORGOT_PASSWORD_TITLE}
    />
  ),
  headerBackTitle: null,
  headerStyle: {
    elevation: 0,
  },
};

export default ForgotPassword;
