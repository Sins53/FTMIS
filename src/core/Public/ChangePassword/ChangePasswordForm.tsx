import { useState } from 'react';
import { useFormik } from 'formik';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import {
  changePasswordInitialValue,
  ChangePasswordRequestData,
  changePasswordValidationSchema
} from './schemaChangePassword';
import { default as logo } from '@/assets/image/logo.png';
import { Box, FlexBox, Image, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { coolGray } from '@/theme/colors';
import Public from '../Public';
import { CardBox, CardWrapper, PasswordInput } from '../Styles/styles';
import { RiEyeCloseLine } from 'react-icons/ri';
import { IoMdEye } from 'react-icons/io';
import { useChangePasswordQuery } from './useChangePasswordQuery';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { useTranslation } from 'react-i18next';

const ChangePassword = (): JSX.Element => {
  const { t } = useTranslation();
  const [formData] = useState(changePasswordInitialValue);
  const [passwordType, setPasswordType] = useState({
    newPassword: true,
    confirmNewPassword: true
  });
  const {
    mutate: changePassword,
    isLoading: isChangePasswordLoading,
    isSuccess
  } = useChangePasswordQuery();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: changePasswordValidationSchema,
    onSubmit: (values: typeof changePasswordInitialValue, { resetForm }) => {
      const resData: ChangePasswordRequestData = {
        password: values.newPassword,
        confirm_password: values.confirmNewPassword
      };

      changePassword(resData);
      isSuccess && resetForm();
    }
  });

  return (
    <>
      <Public>
        <CardBox>
          <Box className="text-center  d-block d-md-none">
            <Image src={logo} height="40" className="mb-3" />
          </Box>
          <CardWrapper>
            <FlexBox justify="space-between">
              <Text variant="h5" typeface="semiBold" color={coolGray[800]} className="mb-2">
                {t('common:changepassword')}
              </Text>
            </FlexBox>
            <Text variant="display2" color={coolGray[600]} className="mb-4">
              {t('fields:changePasswordDescription.label')}
            </Text>

            <form className="form-row" onSubmit={handleSubmit}>
              <Box>
                <Box className="form-group ">
                  <Label htmlFor="password">{t('fields:newPassword.label')}</Label>
                  <PasswordInput>
                    <Input
                      type={passwordType.newPassword ? 'password' : 'text'}
                      value={values?.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="newPassword"
                    />

                    <Button
                      className="btn"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPasswordType({
                          ...passwordType,
                          newPassword: !passwordType.newPassword
                        });
                      }}>
                      {passwordType.newPassword ? <RiEyeCloseLine /> : <IoMdEye />}
                    </Button>
                  </PasswordInput>
                  <FormikValidationError name="newPassword" errors={errors} touched={touched} />
                </Box>
                <Box className="form-group ">
                  <Label htmlFor="password">{t('fields:confirmNewPassword.label')}</Label>
                  <PasswordInput>
                    <Input
                      type={passwordType.confirmNewPassword ? 'password' : 'text'}
                      value={values?.confirmNewPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="confirmNewPassword"
                    />

                    <Button
                      className="btn"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPasswordType({
                          ...passwordType,
                          confirmNewPassword: !passwordType.confirmNewPassword
                        });
                      }}>
                      {passwordType.confirmNewPassword ? <RiEyeCloseLine /> : <IoMdEye />}
                    </Button>
                  </PasswordInput>
                  <FormikValidationError
                    name="confirmNewPassword"
                    errors={errors}
                    touched={touched}
                  />
                </Box>

                <Box className="text-end">
                  <LoadingButton
                    className="btn btn-primary"
                    type="submit"
                    loading={isChangePasswordLoading}
                    text={t('common:buttons.submit')}
                  />
                </Box>
              </Box>
            </form>
          </CardWrapper>
        </CardBox>
      </Public>
    </>
  );
};
export default ChangePassword;
