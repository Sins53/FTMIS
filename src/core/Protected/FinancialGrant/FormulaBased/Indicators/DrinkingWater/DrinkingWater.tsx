import { Box, FlexBox, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/DataTable';
import { getTextByLanguage } from '@/i18n/i18n';
import { base, gray } from '@/theme/colors';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { FormulaIndicatorsProps } from '../indicatorsCommonSchema';
import { useDrinkingWaterDataCreator, useDrinkingWaterDetailsData } from './drinkingWaterQueries';
import {
  DrinkingWaterDetailsData,
  DrinkingWaterInitialValue,
  DrinkingWaterInitialValueProps,
  DrinkingWaterValidationSchema
} from './drinkingWaterSchema';

function DrinkingWater({ provinceData }: FormulaIndicatorsProps) {
  const { t } = useTranslation();
  const { data: drinkingWaterData, isLoading } = useDrinkingWaterDetailsData();
  const { mutate: DrinkingWaterMutate } = useDrinkingWaterDataCreator();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] =
    useState<DrinkingWaterInitialValueProps>(DrinkingWaterInitialValue);

  const {
    values,
    errors,
    handleSubmit,
    touched,
    handleChange,
    handleBlur,
    // resetForm,
    setFieldValue
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: DrinkingWaterValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      DrinkingWaterMutate(requestData, {
        onSuccess: () => {
          resetForm();
          setIsEdit(false);
        }
      });
    }
  });
  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<DrinkingWaterDetailsData>) => {
          return (
            (row.original.province &&
              getTextByLanguage(row.original.province.name_en, row.original.province.name_np)) ||
            ''
          );
        }
      },
      {
        Header: 'Drinking Water Facility',
        accessor: 'drinking_water_index',
        Cell: ({ row }: Cell<DrinkingWaterDetailsData>) => {
          return row.original.drinking_water_index || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<DrinkingWaterDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {drinkingWaterData && drinkingWaterData?.length > 0 && !isEdit ? (
            <>
              <FlexBox align="center" justify="space-between" className="p-3">
                <Text variant="h6" color={base.primary} typeface="semiBold">
                  Drinking Water Facility
                </Text>
                <Button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setFormData({
                      data: drinkingWaterData?.map((item) => {
                        return {
                          province: item.province.id,
                          drinking_water_index: item.drinking_water_index
                        };
                      })
                    });
                    setIsEdit(true);
                  }}>
                  Edit
                </Button>
              </FlexBox>
              <Box className="px-3 flex-grow-1">
                <Table data={drinkingWaterData || []} columns={columns} loading={isLoading} />
              </Box>
            </>
          ) : (
            <FormikProvider value={values}>
              <form
                action=""
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="h-100">
                <Layout.Flex>
                  <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
                    Drinking Water Facility
                  </Text>
                  <Box className="position-relative flex-grow-1 w-100">
                    <Layout.Absolute scrollable>
                      <Box className="p-3 pt-1">
                        <FieldArray
                          name="data"
                          render={() => (
                            <>
                              {provinceData &&
                                provinceData.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <Text color={gray[500]} variant="p" typeface="medium">
                                        {getTextByLanguage(item.name_en, item.name_np) || ''}
                                      </Text>
                                      <div className="row mt-2 mb-4">
                                        <div className="col-lg-3">
                                          <Label>Drinking Water Facility</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.drinking_water_index ?? ''}
                                            onChange={(e) => {
                                              {
                                                setFieldValue(`data.${index}.province`, item.id);
                                                handleChange(e);
                                              }
                                            }}
                                            onBlur={handleBlur}
                                            name={`data.${index}.drinking_water_index`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="drinking_water_index"
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
          )}
        </>
      )}
    </>
  );
}

export default DrinkingWater;
