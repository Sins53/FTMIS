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
import { useFiscalGapDataCreator, useFiscalGapDetailsData } from './fiscalGapQueries';
import {
  FiscalGapDetailsData,
  FiscalGapInitialValue,
  FiscalGapValidationSchema
} from './fiscalGapSchema';

function FiscalGap({ provinceData }: FormulaIndicatorsProps) {
  const { t } = useTranslation();
  const { data: fiscalGapData, isLoading } = useFiscalGapDetailsData();
  const { mutate: fiscalGapMutate } = useFiscalGapDataCreator();
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
    initialValues: FiscalGapInitialValue,
    validationSchema: FiscalGapValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      fiscalGapMutate(requestData);
      resetForm();
    }
  });
  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<FiscalGapDetailsData>) => {
          return row.original.province || '';
        }
      },
      {
        Header: 'Expense Need',
        accessor: 'expense_need',
        Cell: ({ row }: Cell<FiscalGapDetailsData>) => {
          return row.original.expense_need || 0;
        }
      },
      {
        Header: 'Revenue Capacity',
        accessor: 'revenue_capacity',
        Cell: ({ row }: Cell<FiscalGapDetailsData>) => {
          return row.original.revenue_capacity || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FiscalGapDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {fiscalGapData && fiscalGapData?.length > 0 ? (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Fiscal Gap
          </Text>
          <Box className="px-3 flex-grow-1">
            <Table data={fiscalGapData || []} columns={columns} loading={isLoading} />
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
                Fiscal Gap
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
                                      <Label>Expense Need</Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.expense_need ?? ''}
                                        onChange={(e) => {
                                          {
                                            setFieldValue(`data.${index}.province`, item.id);
                                            handleChange(e);
                                          }
                                        }}
                                        onBlur={handleBlur}
                                        name={`data.${index}.expense_need`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="expense_need"
                                        index={index}
                                        keyName="data"
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>
                                    <div className="col-lg-3">
                                      <Label>Revenue Capacity</Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.revenue_capacity ?? ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`data.${index}.revenue_capacity`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="revenue_capacity"
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

export default FiscalGap;
