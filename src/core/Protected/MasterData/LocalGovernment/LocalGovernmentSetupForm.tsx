import { Box } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import {
  FiscalLocalGovernmentInitialValueProp,
  FiscalLocalGovernmentValidationSchema
} from './localGovernmentSchema';
import { useFiscalLocalGovernmentCreator } from './localGovernmentQueries';

interface LocalGovernmentSetupFormProps {
  toggle: () => void;
  isOpen?: boolean;
  formData: FiscalLocalGovernmentInitialValueProp;
}
function LocalGovernmentSetupForm(props: LocalGovernmentSetupFormProps) {
  const { toggle, isOpen, formData } = props;
  const formType = formData.population ? 'Edit' : 'Create';
  const { t } = useTranslation();

  const { mutate: localGovernmentMutate } = useFiscalLocalGovernmentCreator(
    formData.population ? true : false
  );

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: FiscalLocalGovernmentValidationSchema,
    onSubmit: (values: FiscalLocalGovernmentInitialValueProp, { resetForm }) => {
      const requestData = { ...values };
      delete requestData.name;
      localGovernmentMutate(requestData, {
        onSuccess: () => {
          resetForm();
          toggle();
        }
      });
    }
  });

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
            <Box className="row">
              <Box className="col-md-6">
                <Box className="mb-3">
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
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
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
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
                  <Label htmlFor="road">Road (km)</Label>
                  <Input
                    value={values.road}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="road"
                  />
                  <FormikValidationError name="road" errors={errors} touched={touched} />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
                  <Label htmlFor="sed">SED</Label>
                  <Input
                    value={values.sed}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="sed"
                  />
                  <FormikValidationError name="sed" errors={errors} touched={touched} />
                </Box>
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
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
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
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
              </Box>
              <Box className="col-md-6">
                <Box className="mb-3">
                  <Label htmlFor="drinking_water">Drinking Water</Label>
                  <Input
                    value={values.drinking_water}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="drinking_water"
                  />
                  <FormikValidationError name="drinking_water" errors={errors} touched={touched} />
                </Box>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-primary" type="submit">
              {formType === 'Create' ? t('common:buttons.create') : t('common:buttons.edit')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default LocalGovernmentSetupForm;
