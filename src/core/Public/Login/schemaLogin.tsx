// import { passwordRegex } from '@/utils/regex';
import { string as YupString, object as YupObject } from 'yup';

export interface ILogin {
  username: string;
  password: string;
}

export const loginInitialValue: ILogin = {
  username: '',
  password: ''
};

export const loginValidationSchema = YupObject({
  username: YupString().required('fields:username.requiredValidation').trim(),
  password: YupString().required('fields:password.requiredValidation')
  // password: YupString().required('Password is required').matches(passwordRegex, 'Password invalid')
});

export interface BasicResponse {
  description: string;
  servedBy: string;
  status: number;
  success: boolean;
}

export interface LoginResponse extends BasicResponse {
  data: LoginResponseData;
}

export interface LoginResponseData {
  email: string;
  refresh: string;
  access: string;
  uuid: string;
  username: string;
  mobile_number: string;
  need_password_change: boolean;
  otp_flag: boolean;
  otp_starttime: string;
  otp_expirytime: string;
  otp_length: number;
  otp: string;
}
