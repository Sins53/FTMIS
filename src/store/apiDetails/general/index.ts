import { RequestBodyType, RequestMethod } from '../request';

export const login = '/token/';
export const changePassword = '/users/change-password';
export const register = '/users/register';
export const verifyOTP = '/users/verify-otp';
export const resendOTP = '/users/resend-otp';
export const forgotPassword = '/users/forgot-password';
export const changeForgotPassword = '/users/forgot-password/confirm';
export const publicInit = '/master_data/public/init';

export const general = {
  login: {
    controllerName: login,
    queryKeyName: 'LOGIN',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  register: {
    controllerName: register,
    queryKeyName: 'REGISTER',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  changePassword: {
    controllerName: changePassword,
    queryKeyName: 'CHANGE_PASSWORD',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  verifyOTP: {
    controllerName: verifyOTP,
    queryKeyName: 'VERIFY_OTP',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  resendOTP: {
    controllerName: resendOTP,
    queryKeyName: 'Resend_OTP',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  forgotPassword: {
    controllerName: forgotPassword,
    queryKeyName: 'FORGOT_PASSWORD',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  changeForgotPassword: {
    controllerName: changeForgotPassword,
    queryKeyName: 'CHANGE_FORGOT_PASSWORD',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.POST
  },
  getPublicInitDetail: {
    controllerName: publicInit,
    queryKeyName: 'GET_PUBLIC_INIT_DETAIL',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  requestMobileNumberChange: {
    controllerName: '/users/change-mobile-number',
    queryKeyName: 'REQUEST_MOBILE_NUMBER_CHANGE',
    requestMethod: RequestMethod.POST
  },
  resendOTPForMobileNumberChange: {
    controllerName: '/users/change-mobile-number/resend-otp',
    queryKeyName: 'RESEND_OTP_FOR_MOBILE_NUMBER_CHANGE',
    requestMethod: RequestMethod.POST
  },
  verifyMobileNumber: {
    controllerName: '/users/change-mobile-number/verify',
    queryKeyName: 'VERIFY_MOBILE_NUMBER_FOR_CHANGE',
    requestMethod: RequestMethod.POST
  }
};
export default general;
