import { Box, FlexBox, Text } from '@/components/core';
import { Input, Label } from '@/components/core/FormElement';
import Button from '@/components/derived/Buttons/Buttons';
import FormikValidationError from '@/components/FormikValidationError/FormikValidationError';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { gray } from '@/theme/colors';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useBudgetDataById } from '../financialGrantQueries';
import { usePerformanceGrantCreate, usePerformanceGrantData } from './PerformanceBasedQueries';
// import { StyledProvinceBox } from '../financialGrantStyles';
// import PerformanceBasedProvince from './PerformanceBasedProvince';
import { PerformanceGrantInitialValues } from './performanceBasedSchema';
import PerformanceIndicators from './PerformanceIndicators';

const PerformanceBased = () => {
  const [formData] = useState<typeof PerformanceGrantInitialValues>(PerformanceGrantInitialValues);

  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: budgetData } = useBudgetDataById(Number(id));
  const { mutate: performanceGrantMutate } = usePerformanceGrantCreate();

  const { values, errors, handleChange, handleSubmit, touched, handleBlur, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    onSubmit: (values: typeof PerformanceGrantInitialValues) => {
      const reqData = {
        ...values,
        budget: budgetData?.id,
        fiscal_year: budgetData?.fiscal_year?.id
      };
      performanceGrantMutate(reqData);
    }
  });

  const { data: performanceGrantData, isSuccess: performanceGrantSuccess } =
    usePerformanceGrantData(budgetData?.id);

  return (
    <>
      <Layout.Header>
        <HeaderTitle variant="h5" typeface="semiBold">
          Performance Based Form
        </HeaderTitle>
        <FlexBox align="center">
          <Button
            className="mr-2 btn btn-primary"
            onClick={() => navigate(financialGrantPath.PerformanceBasedResult)}>
            View Result
          </Button>
          <Button className="btn" onClick={() => navigate(-1)}>
            <Text variant="display1">{t('common:header.back_to_list')}</Text>
          </Button>
        </FlexBox>
      </Layout.Header>

      <Box className="position-relative flex-grow-1 w-100 mt-4">
        <Layout.Container stretch>
          <FlexBox direction="column" className="h-100 w-100">
            {performanceGrantSuccess && performanceGrantData && performanceGrantData.length > 0 ? (
              <FlexBox justify="space-between" align="center" className="w-100 mb-4">
                <Box>
                  <Text variant="h3" typeface="semiBold" color={gray[600]}>
                    {performanceGrantData[0].budget?.amount}
                  </Text>
                  <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                    Total Amount
                  </Text>
                </Box>
                <Box>
                  <Text variant="h3" typeface="semiBold" color={gray[600]}>
                    {performanceGrantData[0].percent}%
                  </Text>
                  <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                    Performance Grant Total Percent
                  </Text>
                </Box>
              </FlexBox>
            ) : (
              <form
                className="w-100"
                onSubmit={(e: React.FormEvent) => {
                  e.preventDefault();
                  handleSubmit();
                }}>
                <Box className="row w-100 mb-4">
                  <Box className="col-lg-3 col-md-6">
                    <Label htmlFor="percent">Performance Based</Label>
                    <Input
                      value={values.percent}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="percent"
                      type={'number'}
                      rightIcon={<i>%</i>}
                    />
                    <FormikValidationError name="percent" errors={errors} touched={touched} />
                  </Box>
                  <Box className="col">
                    <Label className="d-block">&nbsp;</Label>
                    <Button
                      className="btn btn-outline-primary btn-sm mr-2"
                      onClick={() => {
                        resetForm();
                      }}>
                      Cancel
                    </Button>

                    <Button className="btn btn-primary btn-sm">Save</Button>
                  </Box>
                </Box>
              </form>
            )}
            <div className="divider w-100" />
            <PerformanceIndicators />
          </FlexBox>
        </Layout.Container>
      </Box>
    </>
  );
};

export default PerformanceBased;
