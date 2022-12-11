import { useState } from 'react';
import { useFormik } from 'formik';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { forgotPasswordInitialValue, forgotPasswordValidationSchema } from './schemaForgotPassword';
import { default as logo } from '@/assets/image/logo.png';
import { Box, FlexBox, Image, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { base, coolGray } from '@/theme/colors';
import Public from '../Public';
import { CardBox, CardWrapper } from '../Styles/styles';
import { useNavigate } from 'react-router-dom';
import { publicPath } from '@/routes/public';
import { useForgotPasswordQuery } from './useForgotPasswordQuery';
import { useTranslation } from 'react-i18next';

const ForgotPassword = (): JSX.Element => {
  const [formData, setFormData] = useState(forgotPasswordInitialValue);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: forgotPassword } = useForgotPasswordQuery();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values: typeof forgotPasswordInitialValue, { resetForm }) => {
      setFormData({ ...values });
      forgotPassword({ ...values });
      resetForm();
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
                {t('common:form.forgot_password')}
              </Text>
              <Text
                variant="display2"
                color={base.primary}
                onClick={() => navigate(publicPath.login)}
                className={'cursor-pointer'}>
                {t('common:buttons.back_to_login')}
              </Text>
            </FlexBox>
            <Text variant="display2" color={coolGray[600]} className="mb-5">
              {t('fields:forgotPasswordDescription.label')}
            </Text>

            <form className="form-row" onSubmit={handleSubmit}>
              <Box>
                <Box className="form-group">
                  <Label htmlFor="name">{t('fields:email.label')}</Label>
                  <Input
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                  />
                  <FormikValidationError name="email" errors={errors} touched={touched} />
                </Box>

                <Box className="text-end">
                  <Button className="btn btn-primary" type="submit">
                    {t('common:buttons.submit')}
                  </Button>
                </Box>
              </Box>
            </form>
          </CardWrapper>
        </CardBox>
      </Public>
    </>
  );
};
export default ForgotPassword;
