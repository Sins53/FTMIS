import { Box, FlexBox, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { base, coolGray } from '@/theme/colors';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'reactstrap';
import { commonData, contactValidationSchema } from './schema';
import { useSiteSettingCreator } from './siteSettingQueries';

const Contact = ({ data }: commonData) => {
  const permissionGate = usePermissionGate(SCREEN_CODE.BASE_CONFIGURATION);
  const isEdit = !!data.email || !!data.id;
  const { t } = useTranslation();
  const [languageTooltipIsOpen, setLanguageTooltipIsOpen] = useState(false);

  const { mutate: siteSettingMutate } = useSiteSettingCreator(isEdit);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: contactValidationSchema,
    onSubmit: (values: any) => {
      siteSettingMutate({
        email: values.email,
        phone_number: values.phone_number,
        address: values.address,
        id: values.id
      });
    }
  });

  return (
    <>
      <Text typeface="semiBold" className="mt-4" color={coolGray[800]}>
        {t('common:header.contact_detail')}
      </Text>
      <Box className="flex-grow-1 mt-3 w-100">
        <form
          className="h-100"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <FlexBox direction="column" className="h-100">
            <Box className="flex-grow-1 w-100">
              <Box className="row">
                <Box className="col-lg-4 col-md-6">
                  <Box className="mb-2">
                    <Label htmlFor="phone_number">{t('common:site_setting.landline_eg')}</Label>
                    <Input
                      id="LandLineNumberSiteSetting"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phone_number"
                    />
                    <Tooltip
                      placement="bottom"
                      target="LandLineNumberSiteSetting"
                      isOpen={languageTooltipIsOpen}
                      toggle={() => setLanguageTooltipIsOpen(!languageTooltipIsOpen)}>
                      <Text variant="display1" color={base.primary}>
                        {t('common:site_setting.landline_multiple_input')}
                      </Text>
                    </Tooltip>
                    <FormikValidationError name="phone_number" errors={errors} touched={touched} />
                  </Box>
                </Box>
                <Box className="col-lg-4 col-md-6">
                  <Box className="mb-2">
                    <Label htmlFor="email">{t('fields:email.label')}</Label>
                    <Input
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="email"
                    />
                    <FormikValidationError name="email" errors={errors} touched={touched} />
                  </Box>
                </Box>
                <Box className="col-lg-8">
                  <Box className="mb-2">
                    <Label htmlFor="address">{t('fields:address.label')}</Label>
                    <Input
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="address"
                    />
                    <FormikValidationError name="address" errors={errors} touched={touched} />
                  </Box>
                </Box>
              </Box>
            </Box>
            {permissionGate.can_update && (
              <Box className="text-end w-100 divider px-4 py-3">
                <Button className="btn btn-success" type="submit">
                  {isEdit ? t('common:buttons.update') : t('common:buttons.save')}
                </Button>
              </Box>
            )}
          </FlexBox>
        </form>
      </Box>
    </>
  );
};

export default Contact;
