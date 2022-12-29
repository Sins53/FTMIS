import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { Box } from '@/components/core';
import { Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import PercentInput from '@/components/derived/Input/PercentInput';
import { formulaGrantValidationSchema } from './formulaBasedSchema';
import { useFormulaGrantCreator } from './formulaBasedQueries';
import { useParams } from 'react-router-dom';

interface FormulaGrantFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: any;
}
function FormulaGrantForm(props: FormulaGrantFormProps) {
  const { toggle, isOpen, formData } = props;

  const { id, name } = useParams();

  const { mutate } = useFormulaGrantCreator(formData.id ? true : false, name);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: formulaGrantValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = {
        ...values,
        budget: Number(id)
      };
      delete requestData.total;
      mutate(requestData, {
        onSuccess: () => {
          resetForm();
          toggle();
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
        isOpen={isOpen}
        size="sm">
        <ModalHeader
          toggle={() => {
            toggle();
            resetForm();
          }}>
          Formula Grant Setup
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="mb-3">
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
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-outline-primary" onClick={toggle}>
              Cancel
            </Button>
            <Button className="btn btn-primary" type="submit">
              {formData.id ? t('common:buttons.edit') : t('common:buttons.create')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default FormulaGrantForm;
