import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { minimumGrantValidationSchema } from './minimumGrantSchema';
import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import PercentInput from '@/components/derived/Input/PercentInput';
import {
  useCalculateEqualizationMinimumGrantDetail,
  useEqualizationMinimumGrantCreator
} from './minimumGrantQueries';
import { coolGray } from '@/theme/colors';

interface MinimalGrantFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: any;
}
function MinimalGrantForm(props: MinimalGrantFormProps) {
  const { toggle, isOpen, formData } = props;

  const { mutate: minimumGrantMutate } = useEqualizationMinimumGrantCreator(
    formData.id ? true : false
  );
  const { refetch } = useCalculateEqualizationMinimumGrantDetail({});

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
    setFieldValue
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: minimumGrantValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = {
        ...values
      };
      // if (values.fiscal_year === '') {
      //   delete requestData.fiscal_year;
      // }
      minimumGrantMutate(requestData, {
        onSuccess: () => {
          resetForm();
          toggle();
          if (formData.id) {
            refetch();
          }
        }
      });
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
          <p>Minimal Grant Setup</p>
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
                  <Label htmlFor="percent">Minimal Grant Percentage</Label>
                  <PercentInput
                    value={values.percent}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue('amount', (Number(e.target.value) / 100) * values.total);
                    }}
                    onBlur={handleBlur}
                    name="percent"
                    type={'number'}
                  />
                  <FormikValidationError name="percent" errors={errors} touched={touched} />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-2">
                  <Label htmlFor="amount">Minimal Grant Amount</Label>
                  <Input value={values.amount} name="amount" type={'number'} disabled />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-2">
                  <Label htmlFor="area_percent">Area Percentage</Label>
                  <PercentInput
                    value={values.area_percent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="area_percent"
                    type={'number'}
                  />
                  <FormikValidationError name="area_percent" errors={errors} touched={touched} />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-2">
                  <Label htmlFor="population_percent">Population Percentage</Label>
                  <PercentInput
                    value={values.population_percent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="population_percent"
                    type={'number'}
                  />
                  <FormikValidationError
                    name="population_percent"
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit">
              {formData.id ? 'Update & Calculate' : t('common:buttons.create')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default MinimalGrantForm;
