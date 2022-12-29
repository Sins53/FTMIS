import { useState } from 'react';
import { useFormik } from 'formik';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { loginInitialValue, loginValidationSchema } from './schemaLogin';
import { default as logo } from '@/assets/image/logo.png';
import { Box, FlexBox, Image, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { blue, coolGray } from '@/theme/colors';
import { IoMdEye } from 'react-icons/io';
import { RiEyeCloseLine } from 'react-icons/ri';
import Public from '../Public';
import { CardBox, PasswordInput } from '../Styles/styles';
import { CardWrapper } from '../Styles/styles';
import { useLoginQuery } from './useLoginQuery';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { publicPath } from '@/routes/public';
import { useTranslation } from 'react-i18next';

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [handlePasswordType, setPasswordType] = useState(true);
  const [formData, setFormData] = useState(loginInitialValue);

  const { mutate: getLogin, isLoading: isLoginLoading, isSuccess } = useLoginQuery();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: loginValidationSchema,
    onSubmit: (values: typeof loginInitialValue, { resetForm }) => {
      setFormData({ ...values });
      getLogin({ username: values.username, password: values.password });

      isSuccess && resetForm();
    }
  });

  return (
    <>
      <Public>
        <CardBox>
          <Box className="text-center d-block d-md-none">
            <Image src={logo} height="40" className="mb-3" />
          </Box>
          <CardWrapper>
            <Text variant="h5" typeface="semiBold" color={coolGray[800]} className="mb-2">
              {t('common:form.login')}
            </Text>
            <Text variant="display2" color={coolGray[600]} className="mb-4">
              {t('common:header.login_description')}
            </Text>
            <form className="form-row" onSubmit={handleSubmit}>
              <Box>
                <Box className="form-group">
                  <Label htmlFor="name">
                    {t('fields:email.label')}/{t('fields:username.label')}
                  </Label>
                  <Input
                    value={values?.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    autoComplete="off"
                  />
                  <FormikValidationError name="username" errors={errors} touched={touched} />
                </Box>

                <Box className="form-group ">
                  <Label htmlFor="password">{t('fields:password:label')}</Label>
                  <PasswordInput>
                    <Input
                      type={handlePasswordType ? 'password' : 'text'}
                      value={values?.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      autoComplete="off"
                    />

                    <Button
                      type="button"
                      className="btn"
                      onClick={(e) => {
                        setPasswordType(!handlePasswordType);
                        e.preventDefault();
                      }}>
                      {handlePasswordType ? <RiEyeCloseLine /> : <IoMdEye />}
                    </Button>
                    <FormikValidationError name="password" errors={errors} touched={touched} />
                  </PasswordInput>
                </Box>
                <FlexBox justify="flex-end" className="form-group">
                  <Text
                    variant="display2"
                    color={blue[600]}
                    onClick={() => navigate(publicPath.forgotPassword)}
                    className={'cursor-pointer'}>
                    {t('common:form.forgot_password')}
                  </Text>
                </FlexBox>

                <Box className="text-end">
                  <LoadingButton
                    className="btn btn-primary"
                    type="submit"
                    loading={isLoginLoading}
                    text={t('common:form.login')}
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
export default LoginForm;
