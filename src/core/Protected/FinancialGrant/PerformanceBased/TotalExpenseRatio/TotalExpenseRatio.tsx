import { Box, FlexBox, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/DataTable';
import { useProvinceData } from '@/core/Protected/MasterData/Location/locationQueries';
import { getTextByLanguage } from '@/i18n/i18n';
import { base, gray } from '@/theme/colors';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import {
  useTotalExpenseRatioDataCreator,
  useTotalExpenseRatioDetailsData
} from './totalExpenseRatioQueries';
import {
  TotalExpenseRatioDetailsData,
  TotalExpenseRatioInitialValue,
  TotalExpenseRatioInitialValueProps,
  TotalExpenseRatioValidationSchema
} from './totalExpenseRatioSchema';

function TotalExpenseRatio() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: totalExpenseDetailsData, isLoading } = useTotalExpenseRatioDetailsData({});
  const { mutate: totalExpenseMutate } = useTotalExpenseRatioDataCreator();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(TotalExpenseRatioInitialValue);

  useEffect(() => {
    const arr: TotalExpenseRatioInitialValueProps = { data: [] };
    provinceData &&
      provinceData.records.map((item) => {
        arr.data.push({ province: item.id, allocation_expense: '', real_expense: '' });
      });
    setFormData(arr);
  }, [provinceData]);

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
    validationSchema: TotalExpenseRatioValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      totalExpenseMutate(requestData, {
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
        Cell: ({ row }: Cell<TotalExpenseRatioDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Allocation for Expense',
        accessor: 'allocation_expense',
        Cell: ({ row }: Cell<TotalExpenseRatioDetailsData>) => {
          return row.original.allocation_expense || 0;
        }
      },
      {
        Header: 'Real Expense',
        accessor: 'real_expense',
        Cell: ({ row }: Cell<TotalExpenseRatioDetailsData>) => {
          return row.original.real_expense || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<TotalExpenseRatioDetailsData>) => {
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
          {totalExpenseDetailsData && totalExpenseDetailsData?.length > 0 && !isEdit ? (
            <>
              <FlexBox align="center" justify="space-between" className="p-3">
                <Text variant="h6" color={base.primary} typeface="semiBold">
                  Total Expense Ratio
                </Text>
                <Button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setFormData({
                      data: totalExpenseDetailsData?.map((item) => {
                        return {
                          province: item.province.id,
                          allocation_expense: item.allocation_expense,
                          real_expense: item.real_expense
                        };
                      })
                    });
                    setIsEdit(true);
                  }}>
                  Edit
                </Button>
              </FlexBox>
              <Box className="px-3 flex-grow-1">
                <Table data={totalExpenseDetailsData || []} columns={columns} loading={isLoading} />
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
                    Total Expense Ratio
                  </Text>
                  <Box className="position-relative flex-grow-1 w-100">
                    <Layout.Absolute scrollable>
                      <Box className="p-3 pt-1">
                        <FieldArray
                          name="data"
                          render={() => (
                            <>
                              {provinceData &&
                                provinceData.records.map((item, index) => {
                                  return (
                                    <div key={index}>
                                      <Text color={gray[500]} variant="p" typeface="medium">
                                        {getTextByLanguage(item.name_en, item.name_np) || ''}
                                      </Text>
                                      <div className="row mt-2 mb-4">
                                        <div className="col-lg-3">
                                          <Label>Allocation for Expense</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.allocation_expense ?? ''}
                                            onChange={(e) => {
                                              {
                                                setFieldValue(`data.${index}.province`, item.id);
                                                handleChange(e);
                                              }
                                            }}
                                            onBlur={handleBlur}
                                            name={`data.${index}.allocation_expense`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="allocation_expense"
                                            index={index}
                                            keyName="data"
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                        <div className="col-lg-3">
                                          <Label>Real Expense</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.real_expense ?? ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={`data.${index}.real_expense`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="real_expense"
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

export default TotalExpenseRatio;
