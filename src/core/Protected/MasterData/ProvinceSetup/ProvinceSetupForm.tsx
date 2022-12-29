import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/utils';
import { useFormik } from 'formik';
import React from 'react';
import Button from '@/components/derived/Buttons/Buttons';
import { useTranslation } from 'react-i18next';
import { FiscalProvinceInitialValueProp, FiscalProvinceValidationSchema } from './schema';
import { useFiscalProvinceCreator } from './provinceQueries';
import { gray } from '@/theme/colors';

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
                  <Label htmlFor="road">Road(km)</Label>
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
                  <Label htmlFor="sed_index">Socio-Economic Disparity</Label>
                  <Input
                    value={values.sed_index}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="sed_index"
                  />
                  <FormikValidationError name="sed_index" errors={errors} touched={touched} />
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
                  <Label htmlFor="toilet_availability_index">Toilet Availability Index</Label>
                  <Input
                    value={values.toilet_availability_index}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="toilet_availability_index"
                  />
                  <FormikValidationError
                    name="toilet_availability_index"
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Box>

              <Box className="col-md-6">
                <Box className="mb-3">
                  <Label htmlFor="drinking_water_index">Drinking Water Index</Label>
                  <Input
                    value={values.drinking_water_index}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="drinking_water_index"
                  />
                  <FormikValidationError
                    name="drinking_water_index"
                    errors={errors}
                    touched={touched}
                  />
                </Box>
              </Box>
              <Box className="col-12">
                <Text variant="p" color={gray[500]} className="my-2" typeface="medium">
                  Electricity
                </Text>
                <Box className="row">
                  <Box className="col-md-6">
                    <Box className="mb-3">
                      <Label htmlFor="total_house_hold">Total Household</Label>
                      <Input
                        value={values.total_house_hold}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="total_house_hold"
                      />
                      <FormikValidationError
                        name="total_house_hold"
                        errors={errors}
                        touched={touched}
                      />
                    </Box>
                  </Box>

                  <Box className="col-md-6">
                    <Box className="mb-3">
                      <Label htmlFor="household_with_electricity">Household with electricity</Label>
                      <Input
                        value={values.household_with_electricity}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="household_with_electricity"
                      />
                      <FormikValidationError
                        name="household_with_electricity"
                        errors={errors}
                        touched={touched}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box className="col-12">
                <Text variant="p" color={gray[500]} className="my-2" typeface="medium">
                  Fiscal Gap
                </Text>

                <Box className="row">
                  <Box className="col-md-6">
                    <Label htmlFor="expense_need">Expense Need</Label>
                    <Box className="mb-3">
                      <Input
                        value={values.expense_need}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="expense_need"
                      />
                      <FormikValidationError
                        name="expense_need"
                        errors={errors}
                        touched={touched}
                      />
                    </Box>
                  </Box>
                  <Box className="col-md-6">
                    <Box className="mb-3">
                      <Label>Revenue Capacity</Label>
                      <Input
                        value={values.revenue_capacity}
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="revenue_capacity"
                      />
                      <FormikValidationError
                        name="revenue_capacity"
                        errors={errors}
                        touched={touched}
                      />
                    </Box>
                  </Box>
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

export default ProvinceForm;
