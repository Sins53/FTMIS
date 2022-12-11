import { string as YupString, object as YupObject, ref as YupRef } from 'yup';

export interface IChangePassword {
  newPassword: string;
  confirmNewPassword: string;
}
export const changePasswordInitialValue = {
  newPassword: '',
  confirmNewPassword: ''
};

export const changePasswordValidationSchema = YupObject({
  newPassword: YupString().required('fields:newPassword.requiredValidation'),
  confirmNewPassword: YupString()
    .oneOf([YupRef('newPassword'), null], 'Passwords must match')
    .required('fields:confirmNewPassword.requiredValidation')
});

export interface ChangePasswordRequestData {
  password: string;
  confirm_password: string;
}
