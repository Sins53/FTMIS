import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import {
  CompleteVaccinationInitialValueProps,
  CompleteVaccinationValidationSchema
} from './completeVaccinationSchema';
import { base } from '@/theme/colors';

interface CompleteVaccinationFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: CompleteVaccinationInitialValueProps;
}
function CompleteVaccinationForm(props: CompleteVaccinationFormProps) {
  const { toggle, isOpen, formData } = props;
  const formType = formData.id ? 'Edit' : 'Create';

  // const { mutate: provinceMutate } = useFiscalProvinceCreator(formData.population ? true : false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: CompleteVaccinationValidationSchema,
    onSubmit: (values: CompleteVaccinationInitialValueProps, { resetForm }) => {
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
                  <Label htmlFor="below_24_months_children">No. of Children Below 24 months</Label>
                  <Input
                    value={values.below_24_months_children}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="below_24_months_children"
                  />
                  <FormikValidationError
                    name="below_24_months_children"
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Box>
              <Box className="col-6">
                <Box className="mb-2">
                  <Label htmlFor="childrens_taking_all_vaccination">
                    No. of Children Taking All Vaccinations
                  </Label>
                  <Input
                    value={values.childrens_taking_all_vaccination}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    name="childrens_taking_all_vaccination"
                  />
                  <FormikValidationError
                    name="childrens_taking_all_vaccination"
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

export default CompleteVaccinationForm;
