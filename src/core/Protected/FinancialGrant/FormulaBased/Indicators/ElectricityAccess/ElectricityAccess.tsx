import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import Table from '@/components/Table/DataTable';
import { getTextByLanguage } from '@/i18n/i18n';
import { base, gray } from '@/theme/colors';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { FormulaIndicatorsProps } from '../indicatorsCommonSchema';
import {
  useElectricityAccessDataCreator,
  useElectricityAccessDetailsData
} from './electricityAccessQueries';
import {
  ElectricityAccessDetailsData,
  ElectricityAccessInitialValue,
  ElectricityAccessValidationSchema
} from './electricityAccessSchema';

function ElectricityAccess({ provinceData }: FormulaIndicatorsProps) {
  const { t } = useTranslation();
  const { data: electricityAccessData, isLoading } = useElectricityAccessDetailsData();
  const { mutate: electricityAccessMutate } = useElectricityAccessDataCreator();
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
    initialValues: ElectricityAccessInitialValue,
    validationSchema: ElectricityAccessValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      electricityAccessMutate(requestData);
      resetForm();
    }
  });
  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<ElectricityAccessDetailsData>) => {
          return row.original.province || '';
        }
      },
      {
        Header: 'Household with Electricity',
        accessor: 'household_with_electricity',
        Cell: ({ row }: Cell<ElectricityAccessDetailsData>) => {
          return row.original.household_with_electricity || 0;
        }
      },
      {
        Header: 'Total Household',
        accessor: 'total_house_hold',
        Cell: ({ row }: Cell<ElectricityAccessDetailsData>) => {
          return row.original.total_house_hold || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<ElectricityAccessDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {electricityAccessData && electricityAccessData?.length > 0 ? (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Electricity Access
          </Text>
          <Box className="px-3 flex-grow-1">
            <Table data={electricityAccessData || []} columns={columns} loading={isLoading} />
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
                Electricity Access
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
                                      <Label>Household with Electricity Access</Label>
                                      <Input
                                        type="number"
                                        value={
                                          values?.data[index]?.household_with_electricity ?? ''
                                        }
                                        onChange={(e) => {
                                          {
                                            setFieldValue(`data.${index}.province`, item.id);
                                            handleChange(e);
                                          }
                                        }}
                                        onBlur={handleBlur}
                                        name={`data.${index}.household_with_electricity`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="household_with_electricity"
                                        index={index}
                                        keyName="data"
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>
                                    <div className="col-lg-3">
                                      <Label>Total Households</Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.total_house_hold ?? ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`data.${index}.total_house_hold`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="total_house_hold"
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
                <Button
                  role={'button'}
                  className="btn btn-primary"
                  type="submit"
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleSubmit();
                  }}>
                  {t('common:buttons.submit')}
                </Button>
              </Box>
            </Layout.Flex>
          </form>
        </FormikProvider>
      )}
    </>
  );
}

export default ElectricityAccess;
