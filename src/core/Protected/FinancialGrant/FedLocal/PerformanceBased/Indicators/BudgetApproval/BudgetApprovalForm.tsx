import { Box, Text } from '@/components/core';
import { EnglishDatePicker, Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import formatDate from '@/utils/DateFormatter/dateConverter';
import { useTranslation } from 'react-i18next';
import {
  BudgetApprovalInitialValueProps,
  BudgetApprovalValidationSchema
} from './budgetApprovalSchema';
import { base } from '@/theme/colors';

interface BudgetApprovalFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: BudgetApprovalInitialValueProps;
}
function BudgetApprovalForm(props: BudgetApprovalFormProps) {
  const { toggle, isOpen, formData } = props;
  const formType = formData.id ? 'Edit' : 'Create';

  // const { mutate: provinceMutate } = useFiscalProvinceCreator(formData.population ? true : false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: BudgetApprovalValidationSchema,
    onSubmit: (values: BudgetApprovalInitialValueProps, { resetForm }) => {
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
                  <Label htmlFor="comply">Approval Date</Label>
                  <EnglishDatePicker
                    handleChange={(date) => {
                      date !== null ? formatDate(date) : null;
                    }}
                    value={values?.approval_date ?? ''}
                    maxDate={new Date()}
                    placeHolderText={'Choose Date'}
                  />
                  <FormikValidationError name="comply" errors={errors} touched={touched} />
                </Box>
              </Box>
              <Box className="col-6">
                <Box className="mb-2">
                  <Label htmlFor="comply">Comply</Label>
                  <Input
                    value={values.comply}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="comply"
                  />
                  <FormikValidationError name="comply" errors={errors} touched={touched} />
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

export default BudgetApprovalForm;
