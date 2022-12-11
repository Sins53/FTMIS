import { BasicResponse } from '@/helper/default-action';
import { string as YupString, object as YupObject } from 'yup';

export const forgotPasswordInitialValue = {
  email: ''
};

export const forgotPasswordValidationSchema = YupObject({
  email: YupString().email('fields:email.invalidEmail').required('fields:email.requiredValidation')
});

export interface ForgotPasswordRequestData {
  email: string;
}
export interface ForgortPasswordResponse extends BasicResponse {
  data: ForgortPasswordResponseData;
}
export interface ForgortPasswordResponseData {
  otp_starttime: string;
  otp_expirytime: string;
  otp_length: number;
  otp: string;
  email: string;
}
