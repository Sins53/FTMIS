import { Box, FlexBox, Text } from '@/components/core';
import { CheckBox, Input, Label } from '@/components/core/FormElement';
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
import { useAirQualityIndexData, useAirQualityIndicatorCreator } from './AirQualityIndexQueries';
import {
  AirQualityDetailsData,
  AirQualityFormProps,
  AirQualityInitialValues,
  AirQualityValidationSchema
} from './AirQualityIndexSchema';

function AirQualityIndex() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: airQualityData, isLoading } = useAirQualityIndexData({});
  const { mutate: airQualityMutate } = useAirQualityIndicatorCreator();

  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState(AirQualityInitialValues);
  useEffect(() => {
    const arr: AirQualityFormProps = { data: [] };
    provinceData &&
      provinceData.records.map((item) => {
        arr.data.push({
          province: item.id,
          previous_year_aqi: '',
          last_year_aqi: '',
          improvement: ''
        });
      });
    setFormData(arr);
  }, [provinceData]);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    // resetForm,
    setFieldValue
  } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: AirQualityValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      airQualityMutate(requestData, {
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
        Cell: ({ row }: Cell<AirQualityDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Previous Year AQI',
        accessor: 'previous_year_aqi',
        Cell: ({ row }: Cell<AirQualityDetailsData>) => {
          return row.original.previous_year_aqi || 0;
        }
      },
      {
        Header: 'Last Year AQI',
        accessor: 'last_year_aqi',
        Cell: ({ row }: Cell<AirQualityDetailsData>) => {
          return row.original.last_year_aqi || 0;
        }
      },
      {
        Header: 'Last Year AQI',
        accessor: 'improvement',
        Cell: ({ row }: Cell<AirQualityDetailsData>) => {
          return row.original.improvement || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<AirQualityDetailsData>) => {
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
          {airQualityData && airQualityData?.length > 0 && !isEdit ? (
            <>
              <FlexBox align="center" justify="space-between" className="p-3">
                <Text variant="h6" color={base.primary} typeface="semiBold">
                  Air Quality Index
                </Text>
                <Button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setFormData({
                      data: airQualityData?.map((item) => {
                        return {
                          province: item.province.id,
                          previous_year_aqi: item.previous_year_aqi ?? null,
                          last_year_aqi: item.last_year_aqi ?? null,
                          improvement: item.improvement
                        };
                      })
                    });
                    setIsEdit(true);
                  }}>
                  Edit
                </Button>
              </FlexBox>
              <Box className="px-3 flex-grow-1">
                <Table data={airQualityData || []} columns={columns} loading={isLoading} />
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
                    Air Quality Index
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
                                          <Label>Previous Year AQI</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.previous_year_aqi ?? ''}
                                            onChange={(e) => {
                                              {
                                                setFieldValue(`data.${index}.province`, item.id);
                                                handleChange(e);
                                              }
                                            }}
                                            onBlur={handleBlur}
                                            name={`data.${index}.previous_year_aqi`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="previous_year_aqi"
                                            index={index}
                                            keyName="data"
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                        <div className="col-lg-3">
                                          <Label>Last Year AQI</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.last_year_aqi ?? ''}
                                            onChange={(e) => {
                                              {
                                                setFieldValue(`data.${index}.province`, item.id);
                                                handleChange(e);
                                              }
                                            }}
                                            onBlur={handleBlur}
                                            name={`data.${index}.last_year_aqi`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="last_year_aqi"
                                            index={index}
                                            keyName="data"
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                        <div className="col-lg-3">
                                          <Label>Improvement?</Label>
                                          <Box className="d-flex gap-4">
                                            <CheckBox
                                              name="improvement"
                                              label={'Yes'}
                                              className="pr-3"
                                              onBlur={handleBlur}
                                              checked={values?.data[index]?.improvement === 'Yes'}
                                              onChange={() => {
                                                setFieldValue(`data.${index}.improvement`, 'Yes');
                                                setFieldValue(`data.${index}.province`, item.id);
                                              }}
                                            />
                                            <CheckBox
                                              name="improvement"
                                              label={'No'}
                                              onBlur={handleBlur}
                                              checked={values?.data[index]?.improvement === 'No'}
                                              onChange={() => {
                                                setFieldValue(`data.${index}.improvement`, 'No');
                                                setFieldValue(`data.${index}.province`, item.id);
                                              }}
                                            />
                                          </Box>

                                          <FormikFieldArrayValidationError
                                            name="improvement"
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

export default AirQualityIndex;
