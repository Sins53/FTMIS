import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import { base, gray } from '@/theme/colors';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useFedToLocalMinimumGrantCreator } from './minimumGrantqueries';
import {
  MinGrantInitialValueProps,
  MinGrantValidationSchema,
  PopulationRangeData
} from './minimumGrantschema';

interface MinimumGrantFormProps {
  formData: MinGrantInitialValueProps;
  populationData: PopulationRangeData[];
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const MinimumGrantForm = ({
  formData,
  populationData,
  isEdit,
  setIsEdit
}: MinimumGrantFormProps) => {
  const { t } = useTranslation();
  const { mutate: minGrantMutate } = useFedToLocalMinimumGrantCreator();
  const { id } = useParams();

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: formData,
      validationSchema: MinGrantValidationSchema,
      onSubmit: (values: any, { resetForm }) => {
        const requestData = { ...values, budget: id };
        console.log(requestData, 'qwe');
        minGrantMutate(requestData, {
          onSuccess: () => {
            resetForm();
            setIsEdit(false);
          }
        });
      }
    });

  return (
    <>
      <FormikProvider value={values}>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="h-100">
          <Layout.Flex>
            <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
              Minimum Grant Setup
            </Text>
            <Box className="position-relative flex-grow-1 w-100">
              <Layout.Absolute scrollable>
                <Box className="p-3 pt-1">
                  <FieldArray
                    name="data"
                    render={() => (
                      <>
                        {populationData &&
                          populationData.map((item, index) => {
                            return (
                              <div key={index}>
                                <Text color={gray[500]} variant="p" typeface="medium">
                                  {`${item.min_pop_range} - ${item.max_pop_range}`}
                                </Text>
                                <div className="row mt-2 mb-4">
                                  <div className="col-lg-3">
                                    <Label>No. of Local Level</Label>
                                    <Input
                                      type="number"
                                      value={values?.data[index]?.number_of_localbody ?? ''}
                                      onChange={(e) => {
                                        {
                                          setFieldValue(`data.${index}.population_range`, item.id);
                                          handleChange(e);
                                        }
                                      }}
                                      onBlur={handleBlur}
                                      name={`data.${index}.number_of_localbody`}
                                    />

                                    <FormikFieldArrayValidationError
                                      name="number_of_localbody"
                                      index={index}
                                      keyName="data"
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                  <div className="col-lg-3">
                                    <Label>minimum Grant Amount</Label>
                                    <Input
                                      type="number"
                                      value={values?.data[index]?.minimum_grant_amount ?? ''}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      name={`data.${index}.minimum_grant_amount`}
                                    />

                                    <FormikFieldArrayValidationError
                                      name="minimum_grant_amount"
                                      index={index}
                                      keyName="data"
                                      errors={errors}
                                      touched={touched}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
                  />
                </Box>
              </Layout.Absolute>
            </Box>
            <Box className="divider p-3 w-100 text-end">
              {isEdit && (
                <Button
                  role={'button'}
                  className="btn btn-outline-gray-16 mr-3"
                  type="button"
                  onClick={() => setIsEdit(false)}>
                  {t('common:buttons.cancel')}
                </Button>
              )}
              <Button
                role={'button'}
                className="btn btn-primary"
                type="submit"
                onClick={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleSubmit();
                }}>
                {isEdit ? t('common:buttons.edit') : t('common:buttons.submit')}
              </Button>
            </Box>
          </Layout.Flex>
        </form>
      </FormikProvider>
    </>
  );
};

export default MinimumGrantForm;
