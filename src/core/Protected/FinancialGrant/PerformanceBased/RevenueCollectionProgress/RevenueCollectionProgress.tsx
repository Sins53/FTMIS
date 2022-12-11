import { Box, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import Table from '@/components/Table/DataTable';
import { useProvinceData } from '@/core/Protected/MasterData/Location/locationQueries';
import { getTextByLanguage } from '@/i18n/i18n';
import { base, gray } from '@/theme/colors';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import {
  useRevenueCollectionProgressDataCreator,
  useRevenueCollectionProgressDetailsData
} from './revenueCollectionProgressQueries';
import {
  RevenueCollectionProgressDetailsData,
  RevenueCollectionProgressInitialValue,
  RevenueCollectionProgressValidationSchema
} from './revenueCollectionProgressSchema';

function RevenueCollectionProgress() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: RevenueCollectionDetailsData, isLoading } = useRevenueCollectionProgressDetailsData(
    {}
  );
  const { mutate: RevenueCollectionMutate } = useRevenueCollectionProgressDataCreator();
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
    initialValues: RevenueCollectionProgressInitialValue,
    validationSchema: RevenueCollectionProgressValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      RevenueCollectionMutate(requestData);
      resetForm();
    }
  });

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<RevenueCollectionProgressDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Prior to Last Year Collected Revenue',
        accessor: 'previous_year_collected_revenue',
        Cell: ({ row }: Cell<RevenueCollectionProgressDetailsData>) => {
          return row.original.previous_year_collected_revenue || 0;
        }
      },
      {
        Header: 'Last Year Collected revenue',
        accessor: 'last_year_collected_revenue',
        Cell: ({ row }: Cell<RevenueCollectionProgressDetailsData>) => {
          return row.original.last_year_collected_revenue || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<RevenueCollectionProgressDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {RevenueCollectionDetailsData && RevenueCollectionDetailsData?.length > 0 ? (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Revenue Collection Progress
          </Text>
          <Box className="px-3 flex-grow-1">
            <Table
              data={RevenueCollectionDetailsData || []}
              columns={columns}
              loading={isLoading}
            />
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
                Revenue Collection Progress
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
                                      <Label>Prior to Last Year Collected Revenue</Label>
                                      <Input
                                        type="number"
                                        value={
                                          values?.data[index]?.previous_year_collected_revenue ?? ''
                                        }
                                        onChange={(e) => {
                                          {
                                            setFieldValue(`data.${index}.province`, item.id);
                                            handleChange(e);
                                          }
                                        }}
                                        onBlur={handleBlur}
                                        name={`data.${index}.previous_year_collected_revenue`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="previous_year_collected_revenue"
                                        index={index}
                                        keyName="data"
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>
                                    <div className="col-lg-3">
                                      <Label>Last Year Collected Revenue</Label>
                                      <Input
                                        type="number"
                                        value={
                                          values?.data[index]?.last_year_collected_revenue ?? ''
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`data.${index}.last_year_collected_revenue`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="last_year_collected_revenue"
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

export default RevenueCollectionProgress;
