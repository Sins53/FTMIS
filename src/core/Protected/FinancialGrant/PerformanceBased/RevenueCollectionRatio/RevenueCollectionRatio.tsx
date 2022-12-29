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
  useRevenueCollectionRatioDataCreator,
  useRevenueCollectionRatioDetailsData
} from './revenueCollectionRatioQueries';
import {
  RevenueCollectionRatioDetailsData,
  RevenueCollectionRatioInitialValue,
  RevenueCollectionRatioInitialValueProps,
  RevenueCollectionRatioValidationSchema
} from './revenueCollectionRatioSchema';

function RevenueCollectionRatio() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: RevenueCollectionDetailsData, isLoading } = useRevenueCollectionRatioDetailsData(
    {}
  );
  const { mutate: RevenueCollectionMutate } = useRevenueCollectionRatioDataCreator();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(RevenueCollectionRatioInitialValue);

  useEffect(() => {
    const arr: RevenueCollectionRatioInitialValueProps = { data: [] };
    provinceData &&
      provinceData.records.map((item) => {
        arr.data.push({ province: item.id, projected_revenue: '', collected_revenue: '' });
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
    validationSchema: RevenueCollectionRatioValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      RevenueCollectionMutate(requestData, {
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
        Cell: ({ row }: Cell<RevenueCollectionRatioDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Projected Revenue',
        accessor: 'projected_revenue',
        Cell: ({ row }: Cell<RevenueCollectionRatioDetailsData>) => {
          return row.original.projected_revenue || 0;
        }
      },
      {
        Header: 'Collected Revenue',
        accessor: 'collected_revenue',
        Cell: ({ row }: Cell<RevenueCollectionRatioDetailsData>) => {
          return row.original.collected_revenue || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<RevenueCollectionRatioDetailsData>) => {
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
          {RevenueCollectionDetailsData && RevenueCollectionDetailsData?.length > 0 && !isEdit ? (
            <>
              <FlexBox align="center" justify="space-between" className="p-3">
                <Text variant="h6" color={base.primary} typeface="semiBold">
                  Revenue Collection Ratio
                </Text>
                <Button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setFormData({
                      data: RevenueCollectionDetailsData?.map((item) => {
                        return {
                          province: item.province.id,
                          projected_revenue: item.projected_revenue,
                          collected_revenue: item.collected_revenue
                        };
                      })
                    });
                    setIsEdit(true);
                  }}>
                  Edit
                </Button>
              </FlexBox>
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
                    Revenue Collection Ratio
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
                                          <Label>Projected Revenue</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.projected_revenue ?? ''}
                                            onChange={(e) => {
                                              {
                                                setFieldValue(`data.${index}.province`, item.id);
                                                handleChange(e);
                                              }
                                            }}
                                            onBlur={handleBlur}
                                            name={`data.${index}.projected_revenue`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="projected_revenue"
                                            index={index}
                                            keyName="data"
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                        <div className="col-lg-3">
                                          <Label>Collected Revenue</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.collected_revenue ?? ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={`data.${index}.collected_revenue`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="collected_revenue"
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

export default RevenueCollectionRatio;
