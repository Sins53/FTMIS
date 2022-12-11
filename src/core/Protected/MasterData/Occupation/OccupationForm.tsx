import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement/index';

import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';

import { ModalHeader, Modal, ModalBody, ModalFooter } from '@/components/utils';

import { useFormik } from 'formik';
import { useState } from 'react';
import { useOccupationCreator } from './occupationQueries';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { RequestData, validationSchema } from './occupationSchema';

interface OccupationFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: RequestData;
  isEdit: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function OccupationForm(props: OccupationFormProps) {
  const { toggle, isOpen, formData, isEdit, setIsOpen } = props;

  const { mutate: occupationMutate } = useOccupationCreator(isEdit);

  const [shouldAddNew, setShouldAddNew] = useState(false);

  const { t } = useTranslation();
  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values: RequestData, { resetForm }) => {
      const requestData = { ...values };
      occupationMutate(requestData, {
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
        size="sm"
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
              ? t('common:header.create_occupation')
              : t('common:header.edit_occupation')}
          </p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="mb-2">
              <Label htmlFor="name">{t('fields:occupation_name.label')}</Label>
              <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" />
              <FormikValidationError name="name" errors={errors} touched={touched} />
            </Box>
          </ModalBody>
          <ModalFooter>
            {formType === 'Create' && (
              <Button
                className="btn btn-outline-gray-16"
                type="submit"
                onClick={() => setShouldAddNew(true)}>
                {t('common:buttons.create_add')}
              </Button>
            )}
            <Button
              className="btn btn-success"
              type="submit"
              onClick={() => setShouldAddNew(false)}>
              {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default OccupationForm;
