import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import {
  RevenueCollectionRatioInitialValueProps,
  RevenueCollectionRatioValidationSchema
} from './revenueRatioSchema';
import { base } from '@/theme/colors';

interface RevenueRatioFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: RevenueCollectionRatioInitialValueProps;
}
function RevenueRatioForm(props: RevenueRatioFormProps) {
  const { toggle, isOpen, formData } = props;
  const formType = formData.id ? 'Edit' : 'Create';

  // const { mutate: provinceMutate } = useFiscalProvinceCreator(formData.population ? true : false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: RevenueCollectionRatioValidationSchema,
    onSubmit: (values: RevenueCollectionRatioInitialValueProps, { resetForm }) => {
      const requestData = { ...values };
      delete requestData.name;
      delete requestData.fiscal_year;
      console.log(requestData, 'qwe');
      console.log(resetForm);
    }
  });

  const { t } = useTranslation();
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
          <p>{formData.name}</p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Text color={base.primary} className="mb-3">
              For {values.fiscal_year}
            </Text>
            <Box className="row">
              <Box className="col-6">
                <Box className="mb-2">
                  <Label htmlFor="projected_revenue">Projected Revenue</Label>
                  <Input
                    value={values.projected_revenue}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="projected_revenue"
                  />
                  <FormikValidationError
                    name="projected_revenue"
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Box>
              <Box className="col-6">
                <Box className="mb-2">
                  <Label htmlFor="collected_revenue">Collected Revenue</Label>
                  <Input
                    value={values.collected_revenue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    name="collected_revenue"
                  />
                  <FormikValidationError
                    name="collected_revenue"
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-outline-gray-16 mr-3" type="button" onClick={() => toggle()}>
              Cancel
            </Button>
            <Button className="btn btn-success" type="submit">
              {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default RevenueRatioForm;
