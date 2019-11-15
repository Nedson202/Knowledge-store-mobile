import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import SignupForm from './SignupForm';
import { formStyle } from '../../../styles';
import HeaderTitle from '../../../components/common/HeaderTitle';
import {
  SIGNUP_TITLE, PADDING, VALIDATION_DEBOUNCE_TIME, VERIFY_OTP_ROUTE,
} from '../../../settings';
import CustomText from '../../../components/common/CustomText';
import {
  allFieldsValidation, handleSingleFieldValidation
  , setTokenToStorage
} from '../../../utils';
import { addUser, clientHandler } from '../../../graphql';

import NavigationService from '../../../navigation';
import { setCurrentUser } from '../../../redux/actions/userActions';


const Signup = () => {
  const defaultValues = {
    username: '',
    email: '',
    password: '',
  };
  const [values, setValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { formErrors: newFormErrors } = handleSingleFieldValidation(
      formErrors, { name, value }
    );
    const newValues = { ...values };

    newValues[name] = value.trim();
    setValues(newValues);

    setFormErrors({ ...formErrors, ...newFormErrors });
  }, VALIDATION_DEBOUNCE_TIME);

  const onTextChange = ({ name, value }) => {
    debounceSingleFieldValidation({ name, value });
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    const { isValid, errors } = allFieldsValidation(values, ['username', 'email']);

    if (!isValid) {
      setFormErrors(errors);
      setLoading(false);

      return;
    }

    try {
      const client = await clientHandler();
      const addUserHandler = await client.mutate({
        mutation: addUser,
        variables: {
          ...values
        }
      });
      setLoading(false);
      const {
        data: { addUser: { token } = {}, addUser: payload } = {}
      } = addUserHandler;

      if (token) {
        await setTokenToStorage(token);

        dispatch(setCurrentUser(payload));
        setValues(defaultValues);
        NavigationService.navigate(VERIFY_OTP_ROUTE, {
          verificationType: 'verifyEmail',
          token,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={formStyle.container}
      behavior={PADDING}
      enabled
    >
      <CustomText
        style={formStyle.otpInfo}
      >
        We&apos;ll send an OTP to your email address to verify your email.
        </CustomText>
      <SignupForm
        textChangeHandler={onTextChange}
        handleFormSubmit={handleFormSubmit}
        formErrors={formErrors}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
};

Signup.navigationOptions = {
  headerBackTitle: null,
  headerTitle: (
    <HeaderTitle
      title={SIGNUP_TITLE}
    />
  ),
  headerStyle: {
    elevation: 0,
  },
};

export default Signup;
