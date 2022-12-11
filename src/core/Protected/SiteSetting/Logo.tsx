import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { SuccessToast } from '@/components/ToastNotifier/ToastNotifier';
import { usePermissionGate } from '@/hooks/useModulePermissionGate';
import { SCREEN_CODE } from '@/routes/props';
import { coolGray } from '@/theme/colors';
import { generateFileUrl } from '@/utils';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { commonData, logoValidationSchema } from './schema';
import { useSiteSettingCreator } from './siteSettingQueries';

const Logo = ({ data }: commonData) => {
  const permissionGate = usePermissionGate(SCREEN_CODE.BASE_CONFIGURATION);
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);
  const isEdit = !!data.logo || !!data.id;

  const { mutate: siteSettingMutate } = useSiteSettingCreator(isEdit);

  const { values, errors, handleSubmit, touched, handleBlur, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: logoValidationSchema,
    onSubmit: (values: any) => {
      values.logo.original &&
        siteSettingMutate(
          { id: values.id, logo: values.logo.original },
          {
            onSuccess: () => {
              SuccessToast('Reload page to see the changes');
            }
          }
        );
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('logo', {
      image: (e.target.files && URL.createObjectURL(e.target.files[0])) || '',
      name: e.target.files?.[0].name || '',
      original: e.target.files?.[0]
    });
  };

  return (
    <>
      <Text typeface="semiBold" className="mt-4" color={coolGray[800]}>
        {t('common:header.upload_logo')}
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
              <Box className="py-4">
                <Box className="row justify-content-center">
                  <Box className="col-md-6 col-lg-3">
                    <Box className="file-upload">
                      {!values?.logo ? (
                        <>
                          <label className="text-center" htmlFor="file">
                            <i className="ic-upload mb-3 h3" />
                            <Text variant="display2">
                              <span className="d-block my-3">
                                {t('common:buttons.upload')} {t('common:buttons.file')}
                              </span>
                              <Button
                                type="button"
                                className="btn btn-sm btn-primary"
                                role="button"
                                onClick={() => fileRef?.current?.click()}>
                                {t('common:buttons.browse')}
                              </Button>
                            </Text>
                          </label>
                          <input
                            name="image"
                            id="file"
                            hidden
                            type="file"
                            ref={fileRef}
                            onChange={handleFileUpload}
                            onBlur={handleBlur}
                            accept={'image/*'}
                            onDrag={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          />
                        </>
                      ) : (
                        <div className="text-center w-100">
                          <i
                            className="ic-close close h4"
                            role="button"
                            onClick={() => {
                              setFieldValue('logo', null);
                            }}></i>
                          <div className="file-image__square">
                            <img
                              src={
                                typeof values?.logo === 'string'
                                  ? generateFileUrl(values?.logo)
                                  : values?.logo?.image
                              }
                              alt=""
                              className="file-image__square"
                            />
                          </div>
                        </div>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className="text-center mt-2">
                <FormikValidationError name="logo" errors={errors} touched={touched} />
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
export default Logo;
