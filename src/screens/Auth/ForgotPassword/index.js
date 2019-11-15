import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { View, KeyboardAvoidingView } from 'react-native';
import debounce from 'lodash.debounce';

import { formStyle } from '../../../styles';
import HeaderTitle from '../../../components/common/HeaderTitle';
import CustomText from '../../../components/common/CustomText';
import {
  FORGOT_PASSWORD_TITLE, EMAIL_LABEL, OUTLINE_TYPE, PADDING,
  VALIDATION_DEBOUNCE_TIME, VERIFY_OTP_ROUTE, NONE, RESET_OTP_TITLE, EMAIL_TYPE
} from '../../../settings';
import {
  handleSingleFieldValidation, allFieldsValidation
} from '../../../utils';
import { forgotPassword, clientHandler } from '../../../graphql';
import NavigationService from '../../../navigation';

const ForgotPassword = () => {
  const defaultValues = {
    email: '',
  };
  const [values, setValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { formErrors: newFormErrors } = handleSingleFieldValidation(
      formErrors, { name, value }
    );
    const newValues = { ...values };

    newValues[name] = value.trim();
    setValues(newValues);

    setFormErrors(newFormErrors);
  }, VALIDATION_DEBOUNCE_TIME);

  const onTextChange = ({ name, value }) => {
    debounceSingleFieldValidation({ name, value });
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
