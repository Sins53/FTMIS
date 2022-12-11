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
  useIncreaseForestAreaDataCreator,
  useIncreaseForestAreaDetailsData
} from './increaseForestAreaQueries';
import {
  ForestAreaDetailsData,
  IncreaseForestAreaInitialValue,
  IncreaseForestAreaValidationSchema
} from './increaseForestAreaSchema';

function IncreaseForestArea() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: ForestAreaDetailsData, isLoading } = useIncreaseForestAreaDetailsData({});
  const { mutate: ForestAreaMutate } = useIncreaseForestAreaDataCreator();
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
    initialValues: IncreaseForestAreaInitialValue,
    validationSchema: IncreaseForestAreaValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      ForestAreaMutate(requestData);
      resetForm();
    }
  });

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<ForestAreaDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Previous Year Target for Managing  Community Forest',
        accessor: 'previous_year_target',
        Cell: ({ row }: Cell<ForestAreaDetailsData>) => {
          return row.original.previous_year_target || 0;
        }
      },
      {
        Header: 'Progress',
        accessor: 'progress',
        Cell: ({ row }: Cell<ForestAreaDetailsData>) => {
          return row.original.progress || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<ForestAreaDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {ForestAreaDetailsData && ForestAreaDetailsData?.length > 0 ? (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Increase in Forest Area
          </Text>
          <Box className="px-3 flex-grow-1">
            <Table data={ForestAreaDetailsData || []} columns={columns} loading={isLoading} />
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
                Increase in Forest Area
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
                                      <Label>
                                        Previous Year Target for Managing Community Forest
                                      </Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.previous_year_target ?? ''}
                                        onChange={(e) => {
                                          {
                                            setFieldValue(`data.${index}.province`, item.id);
                                            handleChange(e);
                                          }
                                        }}
                                        onBlur={handleBlur}
                                        name={`data.${index}.previous_year_target`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="previous_year_target"
                                        index={index}
                                        keyName="data"
                                        errors={errors}
                                        touched={touched}
                                      />
                                    </div>
                                    <div className="col-lg-3">
                                      <Label>Progress</Label>
                                      <Input
                                        type="number"
                                        value={values?.data[index]?.progress ?? ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`data.${index}.progress`}
                                      />

                                      <FormikFieldArrayValidationError
                                        name="progress"
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

export default IncreaseForestArea;
