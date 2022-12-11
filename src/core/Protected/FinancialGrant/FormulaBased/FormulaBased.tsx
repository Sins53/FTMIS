import React, { useState, useMemo } from 'react';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { Box, FlexBox, Text } from '@/components/core';
import { blue, gray } from '@/theme/colors';
import Button from '@/components/derived/Buttons/Buttons';
import { useBudgetData } from '../financialGrantQueries';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormulaGrantData, useFormulaGrantFinalResult } from './formulaBasedQueries';
import {
  FormulaGrantData,
  formulaGrantInitialValue,
  formulaGrantInitialValueProp
} from './formulaBasedSchema';
import FormulaGrantForm from './FormulaGrantForm';
import { sanitizeURL } from '@/shared/utils';
import { StyledInformationBox } from './Indicators/indicatorsStyles';
import Table from '@/components/Table/DataTable';
import { Cell } from 'react-table';
import { useTranslation } from 'react-i18next';

const FormulaBased = () => {
  const { data: budgetData } = useBudgetData({});
  const { t } = useTranslation();
  const id = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<formulaGrantInitialValueProp>(formulaGrantInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { data: formulaBasedGrant } = useFormulaGrantData();
  const { data: formulaBasedGrantFinalResult, isLoading } = useFormulaGrantFinalResult();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<FormulaGrantData>) => {
          return row.original.province.name_en || '';
        }
      },
      {
        Header: 'Grant Received',
        accessor: 'grant_received',
        Cell: ({ row }: Cell<FormulaGrantData>) => {
          return row.original.grant_received || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FormulaGrantData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      <Layout.Header backToList>
        <HeaderTitle variant="h5" typeface="semiBold">
          Formula Based
        </HeaderTitle>
      </Layout.Header>

      <Box className="position-relative flex-grow-1 w-100 mt-4">
        <Layout.Container stretch>
          <FlexBox direction="column" className="h-100 w-100">
            {budgetData?.gov_prov.budget?.amount ? (
              <>
                <FlexBox justify="space-between" align="center" className="w-100 mb-4">
                  <Box>
                    <Text variant="h2" typeface="semiBold" color={gray[600]}>
                      {budgetData?.gov_prov.budget?.amount}
                    </Text>
                    <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                      Total Amount
                    </Text>
                  </Box>
                  {formulaBasedGrant?.length > 0 ? (
                    <Box className="px-4">
                      <FlexBox justify="space-around" align="center">
                        <Box className="px-3 text-center">
                          <Text>{`${formulaBasedGrant[0]?.percent} %`}</Text>
                          <Text>Performance Based Percent</Text>
                        </Box>
                        <Button
                          className="btn"
                          onClick={() => {
                            toggle();
                            setFormData({
                              percent: formulaBasedGrant[0]?.percent,
                              id: formulaBasedGrant[0]?.id,
                              fiscal_year: formulaBasedGrant[0]?.fiscal_year.id,
                              total: formulaBasedGrant[0]?.budget.amount,
                              budget: formulaBasedGrant[0]?.budget.id
                            });
                          }}>
                          <i className="ic-edit"></i>
                        </Button>
                      </FlexBox>
                    </Box>
                  ) : (
                    <Box className="text-center">
                      <Text color={gray[400]} variant="h5">
                        Formula Grant Not Set
                      </Text>
                      <Button
                        className="btn btn-primary mt-3"
                        onClick={() => {
                          toggle();
                          setFormData({
                            ...formulaGrantInitialValue,
                            fiscal_year: budgetData.gov_prov.budget.fiscal_year?.id,
                            total: budgetData?.gov_prov.budget?.amount,
                            budget: budgetData.gov_prov.budget?.id
                          });
                        }}>
                        Add Formula Grant
                      </Button>
                    </Box>
                  )}
                  {/* <FlexBox align="center" className="mr-3">
                    <Box className="text-center">
                      <Text variant="h3" typeface="semiBold" color={gray[600]}>
                        {50}%
                      </Text>
                      <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                        Formula Based Total Percent
                      </Text>
                    </Box>
                    <Button
                      className="btn"
                      onClick={() => {
                        alert();
                      }}>
                      <i className="ic-edit"></i>
                    </Button>
                  </FlexBox> */}
                </FlexBox>
                <div className="divider w-100" />
              </>
            ) : (
              <FlexBox justify="center" align="center" direction="column" className="mt-4 w-100">
                <Text color={gray[400]} variant="h5">
                  Budget Not Set for Selected/Current Fiscal Year Go to Budget Setup
                </Text>
                <Button
                  className="btn btn-outline-primary mt-3"
                  onClick={() => navigate(financialGrantPath.FinancialGrant)}>
                  Go Back
                </Button>
              </FlexBox>
            )}
            {budgetData?.gov_prov.budget?.amount &&
              (formulaBasedGrantFinalResult && formulaBasedGrantFinalResult?.length > 0 ? (
                <>
                  <Box className=" h-100 w-100 mt-3">
                    <StyledInformationBox>
                      <Text color={blue[900]}>{'Click to View Indicator Calculations'}</Text>
                      <Button
                        className="btn btn-outline-primary"
                        onClick={() =>
                          navigate(
                            sanitizeURL(financialGrantPath.FormulaBasedIndicators, {
                              name: id.name ?? ''
                            })
                          )
                        }>
                        Details
                      </Button>
                    </StyledInformationBox>
                    <Box className="h-100 mt-4">
                      <Table
                        data={formulaBasedGrantFinalResult || []}
                        columns={columns}
                        loading={isLoading}
                      />
                    </Box>
                  </Box>
                </>
              ) : (
                <FlexBox align="center" justify="center" className="flex-grow-1 w-100">
                  <Box className="text-center">
                    <Text color={gray[600]}>Formula Based Indicators Details Not Filled</Text>
                    <Text color={gray[400]}>Click Below to Go to Formula Indicator Details</Text>
                    <Button
                      className="btn btn-outline-primary mt-3"
                      onClick={() =>
                        navigate(
                          sanitizeURL(financialGrantPath.FormulaBasedIndicators, {
                            name: id.name ?? ''
                          })
                        )
                      }>
                      Click me
                    </Button>
                  </Box>
                </FlexBox>
              ))}
          </FlexBox>
        </Layout.Container>
      </Box>

      <FormulaGrantForm isOpen={isOpen} formData={formData} toggle={toggle} />
    </>
  );
};

export default FormulaBased;
