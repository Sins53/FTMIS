import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import EmptySection from '@/components/EmptySection';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { sanitizeURL } from '@/shared/utils';
import { gray } from '@/theme/colors';
import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PerformanceBasedForm from './PerformanceBasedForm';
import { usePerformanceGrantData, usePerformanceGrantFinalResult } from './PerformanceBasedQueries';
import {
  PerformanceGrantInitialValues,
  PerformanceGrantResultData
} from './performanceBasedSchema';
import Empty from '@/assets/image/Frame.png';
import Spinner from '@/components/Spinner/Spinner';
import { masterConfigurationPath } from '@/routes/master-configuration';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { getTextByLanguage } from '@/i18n/i18n';
import Table from '@/components/Table/DataTable';
import FiscalYearFilterComponent from '../../FiscalYearFilterComponent';

const PerformanceBased = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const { t } = useTranslation();

  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => setModal(!modal);
  const [formData, setFormData] = useState<typeof PerformanceGrantInitialValues>(
    PerformanceGrantInitialValues
  );
  const [fiscalYear, setFiscalYear] = useState<string | number>('');
  const { data: provGrantData, isLoading: provGrantLoading } = usePerformanceGrantFinalResult({
    fiscal_year: fiscalYear
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const {
    data: performanceGrantData,
    isSuccess: performanceGrantSuccess,
    isLoading: performanceGrantLoading
  } = usePerformanceGrantData(Number(id), name === 'gov_prov');

  const fedToProvColumn = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<PerformanceGrantResultData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Grant Received',
        accessor: 'grant_received',
        Cell: ({ row }: Cell<PerformanceGrantResultData>) => {
          return Number(row.original.grant_received) || 0;
        }
      },
      {
        Header: 'Total Marks Obtained',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<PerformanceGrantResultData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {performanceGrantLoading ? (
        <Spinner />
      ) : (
        <Layout.Main>
          <Layout.Header>
            <HeaderTitle variant="h5" typeface="semiBold">
              Performance Grant Result
            </HeaderTitle>
            <Box>
              {performanceGrantSuccess &&
                performanceGrantData &&
                performanceGrantData?.has_indicator && (
                  <Button
                    className="btn btn-outline-primary mr-2"
                    onClick={() => {
                      name &&
                        navigate(
                          sanitizeURL(financialGrantPath.CommonPerformanceBasedIndicators, {
                            name: name
                          })
                        );
                    }}>
                    View Details
                  </Button>
                )}
              {performanceGrantSuccess && performanceGrantData?.percent && (
                <Button
                  className="mr-2 btn btn-primary btn-icon lft"
                  onClick={() => {
                    setIsEdit(true);
                    setFormData({
                      ...PerformanceGrantInitialValues,
                      fiscal_year: performanceGrantData?.fiscal_year.id,
                      budget: performanceGrantData?.budget.id,
                      percent: performanceGrantData?.percent,
                      id: performanceGrantData?.id
                    });
                    toggle();
                  }}>
                  <i className="ic-edit"></i>
                  Edit
                </Button>
              )}

              <Button className="btn btn-outline-primary btn-icon lft" onClick={() => navigate(-1)}>
                <i className="ic-arrow-left"></i>
                Back to list
              </Button>
            </Box>
          </Layout.Header>
          <PerformanceBasedForm
            toggle={toggle}
            modal={modal}
            setModal={setModal}
            formData={formData}
            setFormData={setFormData}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
          <div className="flex-grow-1 mt-3">
            <Layout.Container stretch>
              <Layout.Flex>
                {performanceGrantSuccess && performanceGrantData && performanceGrantData.percent ? (
                  <>
                    <FlexBox justify="space-between" align="center" className="w-100 mb-4">
                      <Box>
                        <Text variant="h3" typeface="semiBold" color={gray[600]}>
                          Rs.{Number(performanceGrantData?.budget?.amount)}
                        </Text>
                        <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                          Total Amount for {performanceGrantData?.fiscal_year?.name}
                        </Text>
                      </Box>
                      <FlexBox>
                        <Box className="pr-3 mr-3 border-right">
                          <Text variant="h3" typeface="semiBold" color={gray[600]}>
                            Rs.{Number(performanceGrantData?.amount)}
                          </Text>
                          <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                            Performance Grant Amount
                          </Text>
                        </Box>
                        <Box>
                          <Text variant="h3" typeface="semiBold" color={gray[600]}>
                            {Number(performanceGrantData?.percent)}%
                          </Text>
                          <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                            Performance Grant Percent
                          </Text>
                        </Box>
                      </FlexBox>
                    </FlexBox>
                    {provGrantData && provGrantData?.length > 0 ? (
                      <Box className="flex-grow-1 w-100">
                        <Table
                          isSearch
                          isFilter
                          data={provGrantData || []}
                          columns={fedToProvColumn}
                          loading={provGrantLoading}
                          TableFilterComponent={
                            <FiscalYearFilterComponent
                              fiscalYear={fiscalYear}
                              setFiscalYear={setFiscalYear}
                            />
                          }
                        />
                      </Box>
                    ) : (
                      <FlexBox align="center" justify="center" className="flex-grow-1 w-100">
                        <Box className="text-center">
                          <EmptySection
                            title={
                              performanceGrantData?.has_indicator
                                ? 'Performance Based Indicators Details Not Filled'
                                : 'Indicators Marks Not Set'
                            }
                            description={
                              performanceGrantData?.has_indicator
                                ? ' Click Below to Go to Performance Indicator Details'
                                : 'Click below to go to Indicator Marks Setup'
                            }
                            button
                            btnText={
                              performanceGrantData?.has_indicator
                                ? 'View Details'
                                : 'Indicators Setup'
                            }
                            btnOnClick={() =>
                              navigate(
                                name && performanceGrantData?.has_indicator
                                  ? sanitizeURL(
                                      financialGrantPath.CommonPerformanceBasedIndicators,
                                      {
                                        name: name
                                      }
                                    )
                                  : sanitizeURL(masterConfigurationPath.indicatorSetup)
                              )
                            }
                          />
                        </Box>
                      </FlexBox>
                    )}
                  </>
                ) : (
                  <>
                    <EmptySection
                      image={Empty}
                      title="Performance Grant Not added"
                      description="Add grant by clicking the button below"
                      button
                      btnText="Add Performance Grant"
                      btnOnClick={toggle}
                    />
                  </>
                )}
              </Layout.Flex>
            </Layout.Container>
          </div>
        </Layout.Main>
      )}
    </>
  );
};

export default PerformanceBased;
