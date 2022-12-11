import { Box, Text } from '@/components/core';
import { CheckBox, Label } from '@/components/core/FormElement';
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
  useReportOnlinePortalCreator,
  useReportOnlinePortalData
} from './reportOnlinePortalQueries';
import {
  onlinePortalDetailsData,
  ReportOnlinePortalInitialValues,
  ReportOnlinePortalValidationSchema
} from './reportOnlinePortalSchema';

function ReportOnlinePortal() {
  const { t } = useTranslation();
  const { data: provinceData } = useProvinceData({});
  const { data: reportOnlinePortalData, isLoading } = useReportOnlinePortalData({});
  const { mutate: reportOnlinePortalMutate } = useReportOnlinePortalCreator();
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
    initialValues: ReportOnlinePortalInitialValues,
    validationSchema: ReportOnlinePortalValidationSchema,
    onSubmit: (values: any, { resetForm }) => {
      const requestData = { ...values };
      reportOnlinePortalMutate(requestData);
      resetForm();
    }
  });
  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<onlinePortalDetailsData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Comply',
        accessor: 'comply',
        Cell: ({ row }: Cell<onlinePortalDetailsData>) => {
          return row.original.comply || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<onlinePortalDetailsData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {reportOnlinePortalData && reportOnlinePortalData?.length > 0 ? (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Reporting on Online Portal on time
          </Text>
          <Box className="px-3 flex-grow-1">
            <Table data={reportOnlinePortalData || []} columns={columns} loading={isLoading} />
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
                Reporting on Online Portal on time
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
                                  <div className="row mt-3 mb-4">
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

export default ReportOnlinePortal;
