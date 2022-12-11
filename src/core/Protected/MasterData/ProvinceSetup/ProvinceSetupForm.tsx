import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { FiscalProvinceInitialValueProp, FiscalProvinceValidationSchema } from './schema';
import { useFiscalProvinceCreator } from './provinceQueries';

interface ProvinceFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: FiscalProvinceInitialValueProp;
}
function ProvinceForm(props: ProvinceFormProps) {
  const { toggle, isOpen, formData } = props;
  const formType = formData.population ? 'Edit' : 'Create';

  const { mutate: provinceMutate } = useFiscalProvinceCreator(formData.population ? true : false);

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: FiscalProvinceValidationSchema,
    onSubmit: (values: FiscalProvinceInitialValueProp, { resetForm }) => {
      const requestData = { ...values };
      provinceMutate(requestData, {
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
            <Box className="mb-2">
              <Label htmlFor="population">Population</Label>
              <Input
                value={values.population}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                name="population"
              />
              <FormikValidationError name="population" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="area">Area</Label>
              <Input
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                name="area"
              />
              <FormikValidationError name="area" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="road">Road</Label>
              <Input
                value={values.road}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                name="road"
              />
              <FormikValidationError name="road" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="mdi">MDI</Label>
              <Input
                value={values.mdi}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                name="mdi"
              />
              <FormikValidationError name="mdi" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="hdi">HDI</Label>
              <Input
                value={values.hdi}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                name="hdi"
              />
              <FormikValidationError name="hdi" errors={errors} touched={touched} />
            </Box>
            <Box className="mb-2">
              <Label htmlFor="it_access">IT Access</Label>
              <Input
                value={values.it_access}
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                name="it_access"
              />
              <FormikValidationError name="it_access" errors={errors} touched={touched} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit">
              {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default ProvinceForm;
