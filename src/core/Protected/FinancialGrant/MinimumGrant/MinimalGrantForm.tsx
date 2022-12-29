import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { minimumGrantValidationSchema } from './minimumGrantSchema';
import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import PercentInput from '@/components/derived/Input/PercentInput';
import {
  useCalculateEqualizationMinimumGrantDetail,
  useEqualizationMinimumGrantCreator
} from './minimumGrantQueries';

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
  const { refetch } = useCalculateEqualizationMinimumGrantDetail();

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
          Minimal Grant Setup
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="row">
              <Box className="col-12">
                <Box className="mb-3">
                  <Label>Total Amount</Label>
                  <Input value={values.total} disabled />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
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
                <Box className="mb-3">
                  <Label htmlFor="amount">Minimal Grant Amount</Label>
                  <Input value={values.amount} name="amount" type={'number'} disabled />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
                  <Label htmlFor="area_percent">Area Percentage</Label>
                  <PercentInput
                    value={values.area_percent}
                    onChange={(e) => {
                      setFieldValue('population_percent', 100 - Number(e.target.value));
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    name="area_percent"
                    type={'number'}
                  />
                  <FormikValidationError name="area_percent" errors={errors} touched={touched} />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
                  <Label htmlFor="population_percent">Population Percentage</Label>
                  <PercentInput
                    value={values.population_percent}
                    onChange={(e) => {
                      setFieldValue('area_percent', 100 - Number(e.target.value));
                      handleChange(e);
                    }}
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
            <Button className="btn btn-outline-primary" type="button" onClick={toggle}>
              Cancel
            </Button>
            <Button className="btn btn-primary" type="submit">
              {formData.id ? 'Update & Calculate' : t('common:buttons.create')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default MinimalGrantForm;
