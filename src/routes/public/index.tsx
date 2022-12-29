import { lazy } from 'react';
// const Welcome = lazy(() => import('@/core/Public/Welcome/Welcome'));

const LoginForm = lazy(() => import('@/core/Public/Login/LoginForm'));
const ForgotPassword = lazy(() => import('@/core/Public/ForgotPassword/ForgotPassword'));
const OTPSuccess = lazy(() => import('@/core/Public/OTP/OTPSucess'));

import { ROUTE_TYPE_ENUM } from '@/shared/enums/route-type';
import { RouteProperties } from '../props';
import ChangePassword from '@/core/Public/ChangePassword/ChangePasswordForm';
import OTPForm from '@/core/Public/OTP/OTPForm';
import ChangeForgotPassword from '@/core/Public/ChangeForgotPassword/ChangeForgotPasswordForm';

export const root = '/';

export const publicPath = {
  login: root + 'login',
  // welcome: root + 'welcome',
  forgotPassword: root + 'forgot-password',
  changePassword: root + 'change-password',
  changeForgotPassword: root + 'change-forgot-password',
  otpForm: root + 'verify-otp',
  otpSuccess: root + 'otp-verified'
};

const publicRoutes: RouteProperties[] = [
  {
    path: '*',
    element: LoginForm
  },
  // {
  //   path: publicPath.welcome,
  //   element: Welcome,
  //   type: ROUTE_TYPE_ENUM.unauthorized
  // },
  {
    path: publicPath.login,
    element: LoginForm,
    type: ROUTE_TYPE_ENUM.unauthorized
  },
  {
    path: publicPath.forgotPassword,
    element: ForgotPassword,
    type: ROUTE_TYPE_ENUM.unauthorized
  },
  {
    path: publicPath.changePassword,
    element: ChangePassword,
    type: ROUTE_TYPE_ENUM.unauthorized
  },
  {
    path: publicPath.changeForgotPassword,
    element: ChangeForgotPassword,
    type: ROUTE_TYPE_ENUM.unauthorized
  },
  {
    path: publicPath.otpForm,
    element: OTPForm,
    type: ROUTE_TYPE_ENUM.unauthorized
  },
  {
    path: publicPath.otpSuccess,
    element: OTPSuccess,
    type: ROUTE_TYPE_ENUM.unauthorized
  }
];
export default publicRoutes;
