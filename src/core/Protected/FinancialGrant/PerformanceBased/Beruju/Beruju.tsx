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
import { useBerujuDataCreator, useBerujuDetailsData } from './BerujuQueries';
import { BerujuDetailsData, BerujuFormInitialValues, BerujuValidationSchema } from './BerujuSchema';

function Beruju() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: berujuData, isLoading } = useBerujuDetailsData({});
  const { mutate: berujuMutate } = useBerujuDataCreator();

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
    initialValues: BerujuFormInitialValues,
    validationSchema: BerujuValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      berujuMutate(requestData);
      resetForm();
    }
  });

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<BerujuDetailsData>) => {
          return row.original.province;
        }
      },
      {
        Header: 'Area (Sq. Km.)',
        accessor: 'area',
        Cell: ({ row }: Cell<BerujuDetailsData>) => {
          return row.original.audited_amount || 0;
        }
      },
      {
        Header: 'Beruju',
        accessor: 'beruju',
        Cell: ({ row }: Cell<BerujuDetailsData>) => {
          return row.original.beruju || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<BerujuDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {berujuData && berujuData?.length > 0 ? (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Beruju
          </Text>
          <Box className="px-3 flex-grow-1">
            <Table data={berujuData || []} columns={columns} loading={isLoading} />
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
                Beruju
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
                                      <Label>Audited Amount</Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.audited_amount ?? ''}
                                        onChange={(e) => {
                                          {
                                            setFieldValue(`data.${index}.province`, item.id);
                                            handleChange(e);
                                          }
                                        }}
                                        onBlur={handleBlur}
                                        name={`data.${index}.audited_amount`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="audited_amount"
                                        index={index}
                                        keyName="data"
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>
                                    <div className="col-lg-3">
                                      <Label>Beruju</Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.beruju ?? ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`data.${index}.beruju`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="beruju"
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

export default Beruju;
