import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement/index';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { ModalHeader, Modal, ModalBody, ModalFooter } from '@/components/utils';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useFormik } from 'formik';
import {
  FiscalYearResponseData,
  FiscalYearResponseType,
  validationSchema
} from './fiscalYearSchema';
import { useFiscalYearCreator } from './fiscalYearQueries';

interface SelfEmploymentProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: FiscalYearResponseType;
  isEdit: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiscalYearForm = (props: SelfEmploymentProps) => {
  const { toggle, isOpen, isEdit, formData, setIsOpen } = props;
  const formType = isEdit ? 'Edit' : 'Create';
  const { t } = useTranslation();

  const { mutate: fiscalYearMutate } = useFiscalYearCreator(isEdit);

  const [shouldAddNew, setShouldAddNew] = useState(false);
  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: (values: FiscalYearResponseData, { resetForm }) => {
      const requestData = { ...values };
      fiscalYearMutate(requestData, {
        onSuccess: () => {
          resetForm();
          setIsOpen(shouldAddNew);
        }
      });
    }
  });
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
          <p>{t('common:header.fiscal_year')}</p>
        </ModalHeader>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <ModalBody>
            <Box className="mb-2">
              <Label htmlFor="name">{t('common:table.fiscal_year')}</Label>
              <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" />
              <FormikValidationError name="name" errors={errors} touched={touched} />
            </Box>
          </ModalBody>
          <ModalFooter>
            {formType === 'Create' && (
              <Button
                className="btn btn-outline-gray-16"
                type="button"
                onClick={() => setShouldAddNew(true)}>
                {t('common:buttons.create_add')}
              </Button>
            )}
            <Button
              className="btn btn-primary"
              type="submit"
              onClick={() => setShouldAddNew(false)}>
              {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default FiscalYearForm;
