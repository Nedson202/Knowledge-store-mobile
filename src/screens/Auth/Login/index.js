import React, { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import { useDispatch } from 'react-redux';

import LoginForm from './LoginForm';
import HeaderTitle from '../../../components/common/HeaderTitle';
import NavigationService from '../../../navigation';
import { clientHandler, loginUser } from '../../../graphql';
import { formStyle } from '../../../styles';

import { setCurrentUser } from '../../../redux/actions/userActions';
import {
  allFieldsValidation,
  handleSingleFieldValidation, setTokenToStorage
} from '../../../utils';
import useAuthSelector from '../../../components/CustomHooks/useAuthSelector';
import {
  CLEAR_TYPE, FORGOT_PASSWORD_ROUTE, FORGOT_PASSWORD_TITLE, LOGIN_TITLE,
  PADDING, SIGNUP_ROUTE, SIGNUP_TITLE, USER_DASHBOARD_ROUTE,
} from '../../../settings';

const Login = () => {
  const defaultValues = {
    username: '',
    password: '',
  };
  const [values, setValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthSelector();

  const screenWillFocus = () => {
    if (!isAuthenticated) {
      return;
    }

    NavigationService.navigate(USER_DASHBOARD_ROUTE);
  };

  const resetScreen = () => {
    setFormErrors({});
  };

  const navigateTo = (location) => {
    return () => {
      NavigationService.navigate(location);
    };
  };

  const onTextChange = ({ name, value }) => {
    const newValues = { ...values };

    newValues[name] = value.trim();
    setValues(newValues);
  };

  const handleBlur = (name) => {
    const { formErrors: newFormErrors, } = handleSingleFieldValidation(
      formErrors, { name, value: values[name] }
    );

    setFormErrors({ ...formErrors, ...newFormErrors });
  };

  const handleFormSubmit = async () => {
    const client = await clientHandler();
    const { isValid, errors } = allFieldsValidation(values, ['email']);

    if (!isValid) {
      setFormErrors(errors);
      setLoading(false);

      return;
    }

    try {
      const loginHandler = await client.mutate({
        mutation: loginUser,
        variables: {
          ...values
        }
      });

      setLoading(false);

      const {
        data: { loginUser: { token } = {}, loginUser: payload } = {}
      } = loginHandler;

      if (token) {
        await setTokenToStorage(token);
        await dispatch(setCurrentUser(payload));

        setValues(defaultValues);
        NavigationService.navigate(USER_DASHBOARD_ROUTE);
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
      <View>
        <NavigationEvents
          onWillFocus={screenWillFocus}
          onWillBlur={resetScreen}
        />
        <LoginForm
          textChangeHandler={onTextChange}
          handleFormSubmit={handleFormSubmit}
          formErrors={formErrors}
          loading={loading}
          handleBlur={handleBlur}
        />

        <View style={formStyle.additionalHelp}>
          <Button
            title={FORGOT_PASSWORD_TITLE}
            type={CLEAR_TYPE}
            titleStyle={formStyle.additionalHelpText}
            onPress={navigateTo(FORGOT_PASSWORD_ROUTE)}
          />
          <Button
            title={SIGNUP_TITLE}
            type={CLEAR_TYPE}
            titleStyle={formStyle.additionalHelpText}
            onPress={navigateTo(SIGNUP_ROUTE)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

Login.navigationOptions = {
  headerBackTitle: null,
  headerTitle: (
    <HeaderTitle
      title={LOGIN_TITLE}
    />
  ),
  headerStyle: {
    elevation: 0,
  },
};

export default Login;
