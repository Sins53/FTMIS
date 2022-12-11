import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement/index';

import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';

import { ModalHeader, Modal, ModalBody, ModalFooter } from '@/components/utils';
import { RequestData, validationSchema } from './designationSchema';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDesignationCreator } from './designationQueries';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';

interface DesignationFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: RequestData;
  isEdit: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DesignationForm(props: DesignationFormProps) {
  const { toggle, isOpen, formData, isEdit, setIsOpen } = props;

  const { mutate: loanTypeMutate } = useDesignationCreator(isEdit);
  const { t } = useTranslation();

  const [shouldAddNew, setShouldAddNew] = useState(false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values: RequestData, { resetForm }) => {
      const requestData = { ...values };
      //delete requestData.loan_category;
      loanTypeMutate(requestData, {
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
            {`${t('common:header.designation')} `}
            {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
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
                isNepali
              />
              <FormikValidationError name="name_np" errors={errors} touched={touched} />
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

export default DesignationForm;
