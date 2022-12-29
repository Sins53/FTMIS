import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import Table from '@/components/Table/DataTable';
import { getTextByLanguage } from '@/i18n/i18n';
import { blue, coolGray, gray } from '@/theme/colors';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import { useBudgetData } from '../financialGrantQueries';
import MinimalGrantForm from './MinimalGrantForm';
import {
  useCalculateEqualizationMinimumGrantDetail,
  useEqualizationMinimumGrantData,
  useEqualizationMinimumGrantDetails
} from './minimumGrantQueries';
import {
  MinimumGrantDetails,
  minimumGrantInitialValue,
  minimumGrantInitialValueProp
} from './minimumGrantSchema';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import styled from 'styled-components';
import FiscalYearFilterComponent from '../FiscalYearFilterComponent';
import EmptySection from '@/components/EmptySection';
import { masterConfigurationPath } from '@/routes/master-configuration';

const StyledInformationBox = styled(Box)`
  display: flex;
  border: 1px solid ${blue[600]};
  padding: 1rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const MinimumGrantView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<minimumGrantInitialValueProp>(minimumGrantInitialValue);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [fiscalYear, setFiscalYear] = useState<string | number>('');

  const { data: budgetData } = useBudgetData({});
  const { data: minimumGrantData } = useEqualizationMinimumGrantData({});
  const { data: minimumGrantDetails, isLoading: minimumGrantDetailLoading } =
    useEqualizationMinimumGrantDetails({
      fiscal_year: fiscalYear
    });
  const { refetch, isLoading: CalculationLoading } = useCalculateEqualizationMinimumGrantDetail();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        accessor: 'province.name_en',
        Cell: ({ row }: Cell<MinimumGrantDetails>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Population',
        accessor: 'population',
        Cell: ({ row }: Cell<MinimumGrantDetails>) => {
          return row.original.population || 0;
        }
      },
      {
        Header: 'Area (Sq. Km.)',
        accessor: 'area',
        Cell: ({ row }: Cell<MinimumGrantDetails>) => {
          return row.original.area || 0;
        }
      },
      {
        Header: 'Total',
        accessor: 'amount',
        Cell: ({ row }: Cell<MinimumGrantDetails>) => {
          return row.original.amount || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      <Layout.Header>
        <HeaderTitle variant="h5" typeface="semiBold">
          Minimum Grant Result
        </HeaderTitle>

        <FlexBox align="center">
          {minimumGrantData && minimumGrantData.percent && (
            <>
              <Button
                className="btn btn-primary btn-icon lft mr-2"
                onClick={() => {
                  toggle();
                  setFormData({
                    ...formData,
                    id: minimumGrantData.id,
                    fiscal_year: minimumGrantData.fiscal_year,
                    total: Number(budgetData?.gov_prov.budget?.amount) || 0,
                    budget: Number(budgetData?.gov_prov.budget?.id),
                    percent: Number(minimumGrantData.percent),
                    amount: Number(minimumGrantData.amount),
                    area_percent: Number(minimumGrantData.area_percent),
                    population_percent: Number(minimumGrantData.population_percent)
                  });
                }}>
                <i className="ic-edit"></i>
                {t('common:buttons.edit')}
              </Button>
            </>
          )}

          <Button className="btn btn-outline-primary btn-icon lft" onClick={() => navigate(-1)}>
            <i className="ic-arrow-left"></i>
            {t('common:header.back_to_list')}
          </Button>
        </FlexBox>
      </Layout.Header>
      <Box className="flex-grow-1">
        <Layout.Container stretch>
          <Layout.Flex>
            <Box className="w-100">
              {budgetData?.gov_prov.budget?.amount ? (
                <>
                  <FlexBox justify="space-between" align="center" className="mt-3">
                    <Box>
                      <Text variant="h3" typeface="semiBold" color={gray[600]}>
                        Rs.{Number(budgetData?.gov_prov.budget?.amount)}
                      </Text>
                      <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                        Total Amount for {budgetData?.gov_prov?.budget.fiscal_year?.name}
                      </Text>
                    </Box>
                    {minimumGrantData && minimumGrantData.percent ? (
                      <>
                        <FlexBox justify="space-around" align="center">
                          <Box className="border-right pr-3 mr-3">
                            <Text variant="h3" typeface="semiBold" color={gray[600]}>
                              Rs.{Number(minimumGrantData?.amount)}
                            </Text>
                            <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                              Minimum Grant Amount
                            </Text>
                          </Box>
                          <Box className="border-right pr-3 mr-3">
                            <Text variant="h3" typeface="semiBold" color={gray[600]}>
                              {Number(minimumGrantData.percent)}%
                            </Text>
                            <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                              Minimum Grant Percent
                            </Text>
                          </Box>
                          <Box className="border-right pr-3 mr-3">
                            <Text variant="h3" typeface="semiBold" color={gray[600]}>
                              {Number(minimumGrantData.area_percent)}%
                            </Text>
                            <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                              Area Percent
                            </Text>
                          </Box>
                          <Box>
                            <Text variant="h3" typeface="semiBold" color={gray[600]}>
                              {Number(minimumGrantData.population_percent)}%
                            </Text>
                            <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                              Population Percent
                            </Text>
                          </Box>
                        </FlexBox>
                      </>
                    ) : (
                      <Button
                        className="btn btn-primary"
                        onClick={() => {
                          toggle();
                          setFormData({
                            ...minimumGrantInitialValue,
                            fiscal_year: budgetData.gov_prov.budget.fiscal_year?.id,
                            total: Number(budgetData?.gov_prov.budget?.amount),
                            budget: budgetData.gov_prov.budget?.id
                          });
                        }}>
                        Add Minimal Grant
                      </Button>
                    )}
                  </FlexBox>
                </>
              ) : (
                <FlexBox justify="center" align="center" direction="column" className="mt-4">
                  <Text color={coolGray[700]} variant="h5">
                    Budget Not Set for Selected/Current Fiscal Year Go to Budget Setup
                  </Text>
                  <Button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => navigate(financialGrantPath.FinancialGrant)}>
                    Go Back
                  </Button>
                </FlexBox>
              )}
            </Box>
            {budgetData?.gov_prov.budget?.amount &&
              minimumGrantData &&
              minimumGrantData.percent &&
              minimumGrantDetails &&
              (minimumGrantDetails?.records.length > 0 ? (
                <>
                  <StyledInformationBox className="mt-4 mb-2 w-100">
                    <Text color={blue[900]}>
                      {"If Province Data's are changed click button to Re-calculate"}
                    </Text>
                    <LoadingButton
                      className="btn btn-outline-primary"
                      onClick={() => refetch()}
                      loading={CalculationLoading}>
                      Recalculate
                    </LoadingButton>
                  </StyledInformationBox>
                  <Box className="flex-grow-1 w-100 position-relative">
                    <Layout.Absolute scrollable>
                      <>
                        <Table
                          data={minimumGrantDetails.records || []}
                          columns={columns}
                          loading={minimumGrantDetailLoading}
                          isFilter
                          TableFilterComponent={
                            <FiscalYearFilterComponent
                              fiscalYear={fiscalYear}
                              setFiscalYear={setFiscalYear}
                            />
                          }
                          isSearch
                        />
                      </>
                    </Layout.Absolute>
                  </Box>
                </>
              ) : (
                <>
                  {minimumGrantData.has_province_details ? (
                    <EmptySection
                      title="Province Data Set Successfully"
                      description="Press Button to Calculate Results"
                      button
                      btnLoading={CalculationLoading}
                      btnOnClick={() => refetch()}
                      btnText={t('common:buttons.calculate')}
                    />
                  ) : (
                    <EmptySection
                      title="Province Data Not Set"
                      description="Go To Master Setup to Input Province Data"
                      button
                      btnOnClick={() => {
                        navigate(masterConfigurationPath.provinceSetup);
                      }}
                      btnText="Province Setup"
                    />
                  )}
                </>
              ))}
          </Layout.Flex>
        </Layout.Container>
      </Box>

      <>
        <MinimalGrantForm toggle={toggle} isOpen={isOpen} formData={formData} />
      </>
    </>
  );
};

export default MinimumGrantView;
