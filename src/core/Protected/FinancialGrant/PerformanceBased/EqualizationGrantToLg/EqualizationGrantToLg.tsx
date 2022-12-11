import { Box, Text } from '@/components/core';
import { CheckBox, EnglishDatePicker, Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import Table from '@/components/Table/DataTable';
import { useProvinceData } from '@/core/Protected/MasterData/Location/locationQueries';
import { getTextByLanguage } from '@/i18n/i18n';
import { base, gray } from '@/theme/colors';
import formatDate from '@/utils/DateFormatter/dateConverter';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import {
  useEqualizationGrantToLgDataCreator,
  useEqualizationGrantToLgDetailsData
} from './equalizationGrantToLgQueries';
import {
  EqualizationGrantToLgDetailsData,
  EqualizationGrantToLgInitialValue,
  EqualizationGrantToLgValidationSchema
} from './equalizationGrantToLgSchema';

function EqualizationGrantToLg() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: equalizationGrantToLgDetailsData, isLoading } = useEqualizationGrantToLgDetailsData(
    {}
  );
  const { mutate: equalizationGrantToLgMutate } = useEqualizationGrantToLgDataCreator();
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
    initialValues: EqualizationGrantToLgInitialValue,
    validationSchema: EqualizationGrantToLgValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      equalizationGrantToLgMutate(requestData);
      resetForm();
    }
  });

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<EqualizationGrantToLgDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Grant Amount',
        accessor: 'grant_amount',
        Cell: ({ row }: Cell<EqualizationGrantToLgDetailsData>) => {
          return row.original.grant_amount || 0;
        }
      },
      {
        Header: 'Provided Date',
        accessor: 'provided_date',
        Cell: ({ row }: Cell<EqualizationGrantToLgDetailsData>) => {
          return formatDate(row.original.provided_date) || '-';
        }
      },
      {
        Header: 'Comply',
        accessor: 'comply',
        Cell: ({ row }: Cell<EqualizationGrantToLgDetailsData>) => {
          return row.original.comply || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<EqualizationGrantToLgDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {equalizationGrantToLgDetailsData && equalizationGrantToLgDetailsData?.length > 0 ? (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Providing Estimation of Equalization Grant to LG on Time
          </Text>
          <Box className="px-3 flex-grow-1">
            <Table
              data={equalizationGrantToLgDetailsData || []}
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
                Providing Estimation of Equalization grant to LG on time
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
                                      <Label>Grant Amount</Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.grant_amount ?? ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`data.${index}.grant_amount`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="grant_amount"
                                        index={index}
                                        keyName="data"
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>
                                    <div className="col-lg-3">
                                      <Label>Provided Date</Label>
                                      <EnglishDatePicker
                                        handleChange={(date) => {
                                          setFieldValue(
                                            `data.${index}.provided_date`,
                                            formatDate(date)
                                          );
                                        }}
                                        value={values?.data[index]?.provided_date ?? ''}
                                        maxDate={new Date()}
                                        placeHolderText={'Choose Date'}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="provided_date"
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

export default EqualizationGrantToLg;
