import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useBranchCreator } from './branchQueries';
import { branchValidationSchema, branchInitialValueProp } from './schema';
import Button from '@/components/derived/Buttons/Buttons';
import StyledSelect, { OptionType } from '@/components/StyledSelect/StyledSelect';
import { useProvinceData } from '../Location/locationQueries';
import { getLanguageLabelValueArray } from '@/utils/selectHelper';

import { useTranslation } from 'react-i18next';

interface BranchFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: branchInitialValueProp;
  isEdit: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function BranchForm(props: BranchFormProps) {
  const { t } = useTranslation();
  const [provincesOption, setProvincesOption] = useState<OptionType[]>();
  const {
    data: provinceData,
    isLoading: provinceLoading,
    isSuccess: provinceFetched
  } = useProvinceData({ view: 'admin', page_size: 50 });

  const { toggle, isOpen, formData, isEdit, setIsOpen } = props;
  const { mutate: branchMutate } = useBranchCreator(isEdit);
  useEffect(() => {
    if (provinceFetched && [provinceData]) {
      const provinces = getLanguageLabelValueArray(provinceData?.records || []);
      setProvincesOption(provinces);
    }
  }, [provinceData, provinceFetched, t]);
  const [shouldAddNew, setShouldAddNew] = useState(false);
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    setFieldValue,
    resetForm
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: branchValidationSchema,
    onSubmit: (values: branchInitialValueProp, { resetForm }) => {
      const requestData = { ...values };
      branchMutate(requestData, {
        onSuccess: () => {
          resetForm();
          setIsOpen(shouldAddNew);
        }
      });
    }
  });
  const formType = isEdit ? 'Edit' : 'Create';
  return (
    <>
      <Modal
        toggle={() => {
          toggle();
          resetForm();
        }}
        isOpen={isOpen}>
        <ModalHeader
          toggle={() => {
            toggle();
            resetForm();
          }}>
          <p>
            {formType === 'Create'
              ? t('branch:branch') + ' ' + t('common:buttons.create')
              : t('branch:branch') + ' ' + t('common:buttons.edit')}
          </p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="mb-2">
              <Label htmlFor="name_en">{t('fields:nameEn.label')}</Label>
              <Input
                value={values.name_en}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name_en"
              />
              <FormikValidationError name="name_en" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="name_np">{t('fields:nameNp.label')}</Label>
              <Input
                value={values.name_np}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name_np"
                isNepali={true}
              />
              <FormikValidationError name="name_np" errors={errors} touched={touched} />
            </Box>

            <Box className="mb-2">
              <Label htmlFor="">{t('fields:branchCode.label')}</Label>
              <Input
                value={values.branch_code}
                onChange={handleChange}
                onBlur={handleBlur}
                name="branch_code"
              />
              <FormikValidationError name="branch_code" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="">{t('fields:province.label')}</Label>
              <StyledSelect
                options={provincesOption || []}
                name="province"
                value={values?.province}
                onChange={({ main }) => {
                  setFieldValue('province', main ?? '');
                }}
                calculateValueOnChange
                onBlur={handleBlur}
                isLoading={provinceLoading}
              />
              <FormikValidationError name="province" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="">{t('fields:address.label')}</Label>
              <Input
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                name="address"
              />
              <FormikValidationError name="address" errors={errors} touched={touched} />
            </Box>
            {/* <Layout.Flex  horizontal>
              <Box className="mb-2 mr-3">
                <Layout.Flex horizontal>
                  <CheckBox
                    checked={values.is_head_office}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="is_head_office"
                  />
                  <Label htmlFor="">&nbsp; Is Head Office</Label>
                </Layout.Flex>
                <FormikValidationError name="is_head_office" errors={errors} touched={touched} />
              </Box>
              <Box className="mb-2">
                <Layout.Flex horizontal>
                  <CheckBox
                    checked={values.is_province_office}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="is_province_office"
                  />
                  <Label htmlFor="">&nbsp;Is Province Office</Label>
                </Layout.Flex>
                <FormikValidationError
                  name="is_province_office"
                  errors={errors}
                  touched={touched}
                />
              </Box>
            </Layout.Flex> */}
          </ModalBody>
          <ModalFooter>
            {formType === 'Create' && (
              <Button
                className="btn btn-outline-gray-16"
                type="button"
                onClick={() => {
                  setShouldAddNew(true);
                  handleSubmit();
                }}>
                {t('common:buttons.create_add')}
              </Button>
            )}
            <Button
              className="btn btn-success"
              type="button"
              onClick={() => {
                setShouldAddNew(false);
                handleSubmit();
              }}>
              {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default BranchForm;
