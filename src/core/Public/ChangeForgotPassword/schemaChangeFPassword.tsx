import { string as YupString, object as YupObject, ref as YupRef } from 'yup';

export interface IChangeForgotPassword {
  newPassword: string;
  confirmNewPassword: string;
}
export const changeForgotPasswordInitialValue = {
  newPassword: '',
  confirmNewPassword: ''
};

export const changeForgotPasswordValidationSchema = YupObject({
  newPassword: YupString().required('fields:newPassword.requiredValidation'),
  confirmNewPassword: YupString()
    .oneOf([YupRef('newPassword'), null], 'Passwords must match')
    .required('fields:confirmNewPassword.requiredValidation')
});

export interface ChangeForgotPasswordRequestData {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}
