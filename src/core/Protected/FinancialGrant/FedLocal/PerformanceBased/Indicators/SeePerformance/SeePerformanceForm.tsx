import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import {
  SeePerformanceInitialValueProps,
  SeePerformanceValidationSchema
} from './seePerformanceSchema';
import { base } from '@/theme/colors';

interface SeePerformanceFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: SeePerformanceInitialValueProps;
}
function SeePerformanceForm(props: SeePerformanceFormProps) {
  const { toggle, isOpen, formData } = props;
  const formType = formData.id ? 'Edit' : 'Create';

  // const { mutate: provinceMutate } = useFiscalProvinceCreator(formData.population ? true : false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: SeePerformanceValidationSchema,
    onSubmit: (values: SeePerformanceInitialValueProps, { resetForm }) => {
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
                  <Label htmlFor="students_appeared_in_see">Total Student Appearing is SEE</Label>
                  <Input
                    value={values.students_appeared_in_see}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="students_appeared_in_see"
                  />
                  <FormikValidationError
                    name="students_appeared_in_see"
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Box>
              <Box className="col-6">
                <Box className="mb-2">
                  <Label htmlFor="scoring_more_gpa">Students Scoring more than 1.6 GPA</Label>
                  <Input
                    value={values.scoring_more_gpa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    name="scoring_more_gpa"
                  />
                  <FormikValidationError
                    name="scoring_more_gpa"
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

export default SeePerformanceForm;
