import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@/components/core';
import { Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import PercentInput from '@/components/derived/Input/PercentInput';
import { coolGray } from '@/theme/colors';
import { formulaGrantValidationSchema } from './formulaBasedSchema';
import { useFormulaGrantCreator } from './formulaBasedQueries';

interface FormulaGrantFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: any;
}
function FormulaGrantForm(props: FormulaGrantFormProps) {
  const { toggle, isOpen, formData } = props;

  const { mutate } = useFormulaGrantCreator(formData.id ? true : false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: formulaGrantValidationSchema,
    onSubmit: (values: any) => {
      const requestData = {
        ...values
      };
      delete requestData.total;
      mutate(requestData);
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
          <p>Formula Grant Setup</p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="row">
              <Box className="col-12">
                <Box className="mb-2">
                  <Text color={coolGray[800]}>Total Amount : {values.total}</Text>
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-2">
                  <Label htmlFor="percent">Formula Grant Percentage</Label>
                  <PercentInput
                    value={values.percent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="percent"
                    type={'number'}
                  />
                  <FormikValidationError name="percent" errors={errors} touched={touched} />
                </Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit">
              {formData.id ? t('common:buttons.edit') : t('common:buttons.create')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default FormulaGrantForm;
