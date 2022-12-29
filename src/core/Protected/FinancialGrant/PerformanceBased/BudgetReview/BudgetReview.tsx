import { Box, FlexBox, Text } from '@/components/core';
import { CheckBox, EnglishDatePicker, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/DataTable';
import { useProvinceData } from '@/core/Protected/MasterData/Location/locationQueries';
import { getTextByLanguage } from '@/i18n/i18n';
import { base, gray } from '@/theme/colors';
import formatDate from '@/utils/DateFormatter/dateConverter';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { useBudgetReviewDataCreator, useBudgetReviewDetailsData } from './budgetReviewQueries';
import {
  budgetReviewDetailsData,
  BudgetReviewInitialValue,
  BudgetReviewInitialValueProps,
  BudgetReviewValidationSchema
} from './budgetReviewSchema';

function BudgetReview() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: BudgetReviewDetailsData, isLoading } = useBudgetReviewDetailsData({});
  const { mutate: BudgetReviewMutate } = useBudgetReviewDataCreator();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(BudgetReviewInitialValue);

  useEffect(() => {
    const arr: BudgetReviewInitialValueProps = { data: [] };
    provinceData &&
      provinceData.records.map((item) => {
        arr.data.push({ province: item.id, published_date: '', comply: '' });
      });
    setFormData(arr);
  }, [provinceData]);

  const {
    values,
    errors,
    handleSubmit,
    touched,
    handleBlur,
    // resetForm,
    setFieldValue
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: BudgetReviewValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      BudgetReviewMutate(requestData, {
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
        Cell: ({ row }: Cell<budgetReviewDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Published Date',
        accessor: 'published_date',
        Cell: ({ row }: Cell<budgetReviewDetailsData>) => {
          return formatDate(row.original.published_date) || '-';
        }
      },
      {
        Header: 'Comply',
        accessor: 'comply',
        Cell: ({ row }: Cell<budgetReviewDetailsData>) => {
          return row.original.comply || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<budgetReviewDetailsData>) => {
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
          {BudgetReviewDetailsData && BudgetReviewDetailsData?.length > 0 && !isEdit ? (
            <>
              <FlexBox align="center" justify="space-between" className="p-3">
                <Text variant="h6" color={base.primary} typeface="semiBold">
                  Budget Review of Last Year on Time
                </Text>
                <Button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setFormData({
                      data: BudgetReviewDetailsData?.map((item) => {
                        return {
                          province: item.province.id,
                          published_date: item.published_date ?? null,
                          comply: item.comply
                        };
                      })
                    });
                    setIsEdit(true);
                  }}>
                  Edit
                </Button>
              </FlexBox>
              <Box className="px-3 flex-grow-1">
                <Table data={BudgetReviewDetailsData || []} columns={columns} loading={isLoading} />
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
                    Budget Review of Last Year on Time
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
                                          <Label>Published Date</Label>
                                          <EnglishDatePicker
                                            handleChange={(date) => {
                                              setFieldValue(
                                                `data.${index}.published_date`,
                                                date !== null ? formatDate(date) : null
                                              );
                                            }}
                                            value={values?.data[index]?.published_date ?? ''}
                                            maxDate={new Date()}
                                            placeHolderText={'Choose Date'}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="published_date"
                                            index={index}
                                            keyName="data"
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                        <div className="col-lg-3">
                                          <Label>Comply</Label>
                                          <Box className="d-flex gap-4">
                                            <CheckBox
                                              name="comply"
                                              label={'Yes'}
                                              className="pr-3"
                                              onBlur={handleBlur}
                                              checked={values?.data[index]?.comply === 'Yes'}
                                              onChange={() => {
                                                setFieldValue(`data.${index}.comply`, 'Yes');
                                                setFieldValue(`data.${index}.province`, item.id);
                                              }}
                                            />
                                            <CheckBox
                                              name="comply"
                                              label={'No'}
                                              onBlur={handleBlur}
                                              checked={values?.data[index]?.comply === 'No'}
                                              onChange={() => {
                                                setFieldValue(`data.${index}.comply`, 'No');
                                                setFieldValue(`data.${index}.province`, item.id);
                                              }}
                                            />
                                          </Box>

                                          <FormikFieldArrayValidationError
                                            name="comply"
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

export default BudgetReview;
