import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from 'react-native-elements';
import OTPForm from './OTPForm';
import { formStyle } from '../../../styles';
import HeaderTitle from '../../../components/common/HeaderTitle';
import CustomText from '../../../components/common/CustomText';
import {
  OTP_TITLE, PADDING, USER_DASHBOARD_ROUTE, RESET_PASSWORD_ROUTE,
  RESEND_OTP_TITLE, CLEAR_TYPE, SIGNUP_TITLE, SIGNUP_ROUTE,
} from '../../../settings';
import {
  verifyEmail, verifyForgotPasswordRequest,
  resendOTP, clientHandler
} from '../../../graphql';
import { setTokenToStorage } from '../../../utils';
import { setCurrentUser } from '../../../redux/actions/userActions';
import NavigationService from '../../../navigation';


const VerifyOTP = ({ navigation }) => {
  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
  };
  const [values, setValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState({});
  const dispatch = useDispatch();
  const token = navigation.getParam('token');
  const type = navigation.getParam('verificationType');

  useEffect(() => {
    initClient();
  }, [values]);

  const initClient = async () => {
    const customClient = await clientHandler();
    setClient(customClient);
  };

  const onTextChange = ({ name, value }) => {
    const valuesCopy = { ...values };
    valuesCopy[name] = value;
    setValues(valuesCopy);
  };

  const handleOTPVerification = async () => {
    setLoading(true);
    let allCode = '';
    const selectQuery = {
      verifyEmail: verifyEmail,
      forgotPasswordRequest: verifyForgotPasswordRequest,
    };

    Object.values(values).forEach(code => {
      allCode = `${allCode}${code}`;
    });

    if (allCode.length !== 4) {
      setLoading(false);

      return;
    }

    const OTPQuery = selectQuery[type];

    await handleEmailVerification(allCode, type, OTPQuery);
    await handleForgotPasswordVerification(allCode, type, OTPQuery);
    setLoading(false);
  };

  const handleVerificationCheck = async (code, OTPQuery) => {
    const response = await client.mutate({
      mutation: OTPQuery,
      variables: {
        OTP: code,
        token: `Bearer ${token}`,
      }
    });

    return response;
  };

  const handleEmailVerification = async (code, requestType, OTPQuery) => {
    if (requestType !== 'verifyEmail') {
      return;
    }

    const response = await handleVerificationCheck(code, OTPQuery);
    const {
      data: {
        verifyEmail: { token: newToken } = {},
        verifyEmail: payload
      } = {},
    } = response;

    if (newToken) {
      await setTokenToStorage(newToken);

      dispatch(setCurrentUser(payload));
      client.resetStore();
      NavigationService.navigate(USER_DASHBOARD_ROUTE);
    }
  };

  const handleForgotPasswordVerification = async (code, requestType, OTPQuery) => {
    if (requestType !== 'forgotPasswordRequest') {
      return;
    }

    const response = await handleVerificationCheck(code, OTPQuery);
    const {
      data: { verifyForgotPasswordRequest: { message }, } = {},
    } = response;

    if (message) {
      NavigationService.navigate(RESET_PASSWORD_ROUTE);
    }
  };

  const handleOTPResend = async () => {
    try {
      const resendOTPHandler = await client.mutate({
        mutation: resendOTP,
        variables: {
          token: `Bearer ${token}`,
        }
      });
      const {
        data: { resendOTP: { message }, } = {},
      } = resendOTPHandler;

      if (message) {
        setValues(defaultValues);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={formStyle.container} behavior={PADDING} enabled>
      <View>
        <CustomText style={formStyle.forgotPasswordMsg}>
          Enter the verification code we just sent you on your email address.
        </CustomText>
        <OTPForm
          textChangeHandler={onTextChange}
          values={values}
          handleOTPVerification={handleOTPVerification}
          loading={loading}
        />
        <View style={[formStyle.additionalHelp]}>
          <Button
            title={RESEND_OTP_TITLE}
            type={CLEAR_TYPE}
            titleStyle={formStyle.additionalHelpText}
            onPress={handleOTPResend}
          />
          <Button
            title={SIGNUP_TITLE}
            type={CLEAR_TYPE}
            titleStyle={formStyle.additionalHelpText}
            onPress={() => {
              NavigationService.navigate(SIGNUP_ROUTE);
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

VerifyOTP.navigationOptions = {
  headerBackTitle: null,
  headerTitle: (
    <HeaderTitle
      title={OTP_TITLE}
    />
  ),
  headerStyle: {
    elevation: 0,
  },
};

export default VerifyOTP;

