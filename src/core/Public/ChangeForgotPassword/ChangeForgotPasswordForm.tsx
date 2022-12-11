import { useState } from 'react';
import { useFormik } from 'formik';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import {
  changeForgotPasswordInitialValue,
  changeForgotPasswordValidationSchema,
  ChangeForgotPasswordRequestData
} from './schemaChangeFPassword';

import { Box, FlexBox, Image, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { coolGray } from '@/theme/colors';
import Public from '../Public';
import { CardBox, CardWrapper, PasswordInput } from '../Styles/styles';
import { RiEyeCloseLine } from 'react-icons/ri';
import { IoMdEye } from 'react-icons/io';
import { useChangeForgotPasswordQuery } from './useChangeForgotPasswordQuery';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import useAuth from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { publicPath } from '@/routes/public';
import { default as LogoImg } from '@/assets/image/logo.png';

const ChangeForgotPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData] = useState(changeForgotPasswordInitialValue);
  const [passwordType, setPasswordType] = useState({
    newPassword: true,
    confirmNewPassword: true
  });
  const { changeForgotPasswordRes } = useAuth();

  const {
    mutate: changePassword,
    isLoading: isChangeForgotPasswordLoading,
    isSuccess
  } = useChangeForgotPasswordQuery();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: changeForgotPasswordValidationSchema,
    onSubmit: (values: typeof changeForgotPasswordInitialValue, { resetForm }) => {
      const resData: ChangeForgotPasswordRequestData = {
        new_password1: values.newPassword,
        new_password2: values.confirmNewPassword,
        token: changeForgotPasswordRes?.token ?? '',
        uid: changeForgotPasswordRes?.uid ?? ''
      };
      if (changeForgotPasswordRes?.token && changeForgotPasswordRes?.uid) {
        changePassword(resData);
        isSuccess && resetForm();
      } else {
        navigate(publicPath.login);
      }
    }
  });

  return (
    <>
      <Public>
        <CardBox>
          <Box className="text-center  d-block d-md-none">
            <Image src={LogoImg} height="40" className="mb-3" />
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
                    loading={isChangeForgotPasswordLoading}
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
export default ChangeForgotPassword;
