import { Box, FlexBox, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import EmptySection from '@/components/EmptySection';
import { FormikFieldArrayValidationError } from '@/components/FormikValidationError/FormikValidationError';
import Layout from '@/components/layout';
import StyledSelect from '@/components/StyledSelect/StyledSelect';
import { TabContent, TabPane } from '@/components/Tab';
import { Nav, NavItem, NavLink } from '@/components/Tab/TabHeader/tab-styles';
import { gray } from '@/theme/colors';
import { BUDGETENUM } from '@/utils';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIndicatorData } from '../../FinancialGrant/PerformanceBased/PerformanceBasedQueries';
import { useIndicatorMarksCreator, useIndicatorMarksData } from './IndicatorQueries';
import {
  Datum,
  IndicatorInitialValues,
  IndicatorProps,
  IndicatorValidationSchema
} from './IndicatorSchema';

function IndicatorForm() {
  const [activeTab, setActiveTab] = useState<{ grant_type: string; grant_id: number }>({
    grant_type: 'performance',
    grant_id: 1
  });
  const [formData, setFormData] = useState<IndicatorProps>(IndicatorInitialValues);
  const toggle = (tab: typeof activeTab) => setActiveTab(tab);
  const grantOptions = Object.entries(BUDGETENUM).map((opt: any) => ({
    label: opt[0],
    value: opt[1]
  }));
  const { mutate: indicatorMarksMutate } = useIndicatorMarksCreator();

  const { t } = useTranslation();

  const { handleSubmit, setFieldValue, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: formData,
      validationSchema: IndicatorValidationSchema,
      onSubmit: (values) => {
        const reqData = {
          ...values,
          grant_type: activeTab.grant_type,
          grant_id: activeTab.grant_id,
          module: values?.module?.value
        };

        indicatorMarksMutate(reqData);
      }
    });

  const { data: indicatorData } = useIndicatorData({
    grant: activeTab.grant_type,
    module: values.module?.value
  });

  const { data: indicatorMarksData } = useIndicatorMarksData({
    grant_type: activeTab.grant_type,
    module: values.module?.value
  });

  const dataFetch = () => {
    const arr: Datum[] = [];
    indicatorData?.map((indicator) => {
      arr.push({
        marks: null,
        name: indicator.name,
        indicator: indicator.id
      });
    });

    setFormData({ ...formData, data: arr });
  };

  useEffect(() => {
    dataFetch();
  }, [activeTab, values.module]);

  useEffect(() => {
    if (indicatorMarksData && indicatorMarksData.length > 0) {
      const reqData = indicatorMarksData?.map((item) => ({
        marks: item.marks,
        indicator: item.indicator.id,
        name: item.indicator.name
      }));

      setFormData({
        ...formData,
        module: values.module,
        data: reqData
      });
    } else {
      dataFetch();
    }
  }, [indicatorMarksData, values.module, activeTab]);

  return (
    <>
      <Nav tabs className="tab-01 mt-4 w-100">
        <NavItem>
          <NavLink
            className={activeTab.grant_type == 'performance' ? 'active' : ''}
            onClick={() => {
              toggle({
                grant_type: 'performance',
                grant_id: 1
              });
            }}>
            {t('common:tabs.performance')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab.grant_type == 'formula' ? 'active' : ''}
            onClick={() => {
              toggle({
                grant_type: 'formula',
                grant_id: 2
              });
            }}>
            {t('common:tabs.formula')}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab.grant_type} className=" flex-grow-1 w-100">
        <TabPane tabId={activeTab.grant_type} className="h-100">
          <FormikProvider value={values as any}>
            <form
              className="h-100"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handleSubmit();
              }}>
              <Layout.Flex>
                <Box className="position-relative w-100 flex-grow-1">
                  <Layout.Absolute scrollable={values.module ? true : false} className="p-3">
                    <div className="row h-100">
                      <div className="col-md-6">
                        <Box className="mb-3">
                          <Label>Grant Type</Label>
                          <StyledSelect
                            className="w-50"
                            options={grantOptions}
                            value={values.module}
                            name="module"
                            onChange={(e: any) => {
                              setFieldValue(e.name, e.value);
                            }}
                          />
                        </Box>

                        {values.module && activeTab ? (
                          <FieldArray
                            name="data"
                            render={() => (
                              <>
                                {indicatorData &&
                                  indicatorData.map((item, index) => {
                                    return (
                                      <div className="row mt-2 mb-4" key={index}>
                                        <div className="col-lg-6 my-auto">
                                          <Text
                                            color={gray[500]}
                                            variant="p"
                                            typeface="medium"
                                            className="text-capitalize">
                                            {item.name}
                                          </Text>
                                        </div>
                                        <div className="col-lg-6">
                                          <Label>Marks</Label>
                                          <Input
                                            type="number"
                                            value={values?.data[index]?.marks ?? ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={`data.${index}.marks`}
                                          />

                                          <FormikFieldArrayValidationError
                                            name="marks"
                                            index={index}
                                            keyName="data"
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                              </>
                            )}
                          />
                        ) : (
                          <EmptySection
                            style={{ transform: 'translateX(50%)' }}
                            title="Grant type not chosen"
                            description="Please choose grant type to view information"
                          />
                        )}
                      </div>
                      {typeof errors.data === 'string' && (
                        <div className="col-lg-4 col-xxl-3 ml-auto">
                          {errors.data && (
                            <FlexBox className="alert-danger position-sticky top-0 p-3 mb-3">
                              <h5 className="ic-info mr-3 mt-1"></h5>
                              <Box>
                                <h5>Error</h5>
                                <h6 className="mt-2">{errors.data}</h6>
                              </Box>
                            </FlexBox>
                          )}
                        </div>
                      )}
                    </div>
                  </Layout.Absolute>
                </Box>
                {values.module && activeTab && (
                  <>
                    <div className="divider w-100" />
                    <Box className="p-3 w-100 text-end">
                      <Button className="btn btn-primary"> {t('common:buttons.save')}</Button>
                    </Box>
                  </>
                )}
              </Layout.Flex>
            </form>
          </FormikProvider>
        </TabPane>
      </TabContent>
    </>
  );
}

export default IndicatorForm;
