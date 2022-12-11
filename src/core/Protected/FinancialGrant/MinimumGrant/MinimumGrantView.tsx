import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import Table from '@/components/Table/DataTable';
import { getTextByLanguage } from '@/i18n/i18n';
import { blue, coolGray } from '@/theme/colors';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import CommonFiscalSelector from '../../CommonFiscalSelector/CommonFiscalSelector';
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

const StyledInformationBox = styled(Box)`
  display: flex;
  border: 1px solid ${blue[600]};
  padding: 1rem;
  margin: 1rem 1.5rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const MinimumGrantView = () => {
  const { t } = useTranslation();
  const [fiscalYear, setFiscalYear] = useState<string | number>('');

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<minimumGrantInitialValueProp>(minimumGrantInitialValue);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { data: budgetData } = useBudgetData({});
  const { data: minimumGrantData } = useEqualizationMinimumGrantData({});
  const { data: minimumGrantDetails, isLoading: minimumGrantDetailLoading } =
    useEqualizationMinimumGrantDetails({
      fiscal_year: fiscalYear
    });
  const { refetch, isLoading: CalculationLoading } = useCalculateEqualizationMinimumGrantDetail({
    fiscal_year: fiscalYear
  });

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
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

  const navigate = useNavigate();
  return (
    <>
      <Layout.Header backToList>
        <HeaderTitle variant="h5" typeface="semiBold">
          Minimum Grant Details
        </HeaderTitle>
      </Layout.Header>
      <Box className="mt-4 px-4">
        <FlexBox justify="flex-end" align="center">
          <CommonFiscalSelector fiscalYear={fiscalYear} setFiscalYear={setFiscalYear} />
        </FlexBox>

        {budgetData?.gov_prov.budget?.amount ? (
          <>
            <FlexBox justify="space-between" align="center" className="mt-3">
              <Box>
                <Text variant="h1">{budgetData?.gov_prov.budget?.amount}</Text>
                <Text>Total Amount for {budgetData?.gov_prov?.budget.fiscal_year?.name}</Text>
              </Box>
              {minimumGrantData ? (
                <Box className="px-4">
                  <FlexBox justify="space-around" align="center">
                    <Box className="px-3 text-center">
                      <Text>{`${minimumGrantData.percent} %`}</Text>
                      <Text>Minimum Grant</Text>
                    </Box>
                    <Box className="px-3 text-center">
                      <Text>{`${minimumGrantData.area_percent} %`}</Text>
                      <Text>Area</Text>
                    </Box>
                    <Box className="px-3 text-center">
                      <Text>{`${minimumGrantData.population_percent} %`}</Text>
                      <Text>Population</Text>
                    </Box>
                    <Button
                      className="btn"
                      onClick={() => {
                        toggle();
                        setFormData({
                          ...formData,
                          id: minimumGrantData.id,
                          fiscal_year: minimumGrantData.fiscal_year,
                          total: budgetData?.gov_prov.budget?.amount,
                          budget: budgetData.gov_prov.budget?.id,
                          percent: minimumGrantData.percent,
                          amount: minimumGrantData.amount,
                          area_percent: minimumGrantData.area_percent,
                          population_percent: minimumGrantData.population_percent
                        });
                      }}>
                      <i className="ic-edit"></i>
                    </Button>
                  </FlexBox>
                </Box>
              ) : (
                <Box className="text-center">
                  <Text color={coolGray[700]} variant="h5">
                    Minimal Grant Not Set
                  </Text>
                  <Button
                    className="btn btn-primary mt-3"
                    onClick={() => {
                      toggle();
                      setFormData({
                        ...minimumGrantInitialValue,
                        fiscal_year: budgetData.gov_prov.budget.fiscal_year?.id,
                        total: budgetData?.gov_prov.budget?.amount,
                        budget: budgetData.gov_prov.budget?.id
                      });
                    }}>
                    Add Minimal Grant
                  </Button>
                </Box>
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
        minimumGrantDetails &&
        (minimumGrantDetails?.records.length > 0 ? (
          <>
            {fiscalYear === budgetData?.gov_prov.budget?.fiscal_year?.id && (
              <StyledInformationBox>
                <Text color={blue[900]}>
                  {"If any Data's are changed click button to Re-calculate"}
                </Text>
                <LoadingButton
                  className="btn btn-outline-primary"
                  onClick={() => refetch()}
                  loading={CalculationLoading}>
                  Recalculate
                </LoadingButton>
              </StyledInformationBox>
            )}
            <Box className="flex-grow-1 position-relative m-4">
              <Layout.Absolute scrollable>
                <>
                  <Table
                    data={minimumGrantDetails.records || []}
                    columns={columns}
                    loading={minimumGrantDetailLoading}
                  />
                </>
              </Layout.Absolute>
            </Box>
          </>
        ) : fiscalYear === budgetData?.gov_prov.budget.fiscal_year?.id && minimumGrantData?.id ? (
          <FlexBox className="flex-grow-1" direction="column" align="center" justify="center">
            <Text color={coolGray[700]}>
              All Data Filled Successfully Click the Button Below to Generate Results
            </Text>
            <LoadingButton
              className="btn btn-primary mt-3"
              onClick={() => refetch()}
              loading={CalculationLoading}>
              Calculate
            </LoadingButton>
          </FlexBox>
        ) : (
          <>
            <FlexBox className="flex-grow-1" direction="column" align="center" justify="center">
              <Text color={coolGray[700]}>No Data Available For Selected Fiscal Year</Text>
            </FlexBox>
          </>
        ))}

      <>
        <MinimalGrantForm toggle={toggle} isOpen={isOpen} formData={formData} />
      </>
    </>
  );
};

export default MinimumGrantView;
