import { StyleSheet } from 'react-native';

import { GEORGIA_BOLD, georgia, WHITE_1, BLACK_2, BLACK_3 } from '../../settings';

const formStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: WHITE_1,
  },
  formLabel: {
    color: BLACK_3,
    fontFamily: georgia,
    fontWeight: 'normal',
  },
  errorColor: {
    color: 'red',
  },
  errorStyle: {
    fontFamily: georgia,
    fontSize: 15,
  },
  formInputStyle: {
    fontFamily: georgia,
    fontSize: 16,
    width: '100%',
  },
  otpView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInputStyle: {
    paddingLeft: '40%',
    fontFamily: GEORGIA_BOLD,
    fontWeight: 'normal',
    fontSize: 18,
  },
  customAuth: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  customAuthText: {
    fontSize: 18,
    fontFamily: GEORGIA_BOLD
  },
  forgotPasswordMsg: {
    fontSize: 17,
    fontFamily: GEORGIA_BOLD,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  otpInfo: {
    fontSize: 17,
    fontFamily: GEORGIA_BOLD,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  socialAuthButtons: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 15,
  },
  socialAuthButton: {
    fontFamily: GEORGIA_BOLD,
    fontWeight: 'normal',
  },
  customAuthAction: {
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
    width: '60%',
    marginLeft: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: BLACK_2,
  },
  customAuthActionText: {
    fontFamily: georgia,
    color: BLACK_2,
    fontSize: 16,
  },
  additionalHelp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -10,
  },
  additionalHelpText: {
    fontSize: 15,
    fontFamily: georgia,
    color: BLACK_2,
  },
});

export default formStyle;
