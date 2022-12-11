import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import Table from '@/components/Table/DataTable';
import { getTextByLanguage } from '@/i18n/i18n';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { base, gray } from '@/theme/colors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import { usePerformanceGrantFinalResult } from './PerformanceBasedQueries';
import { PerformanceGrantResultData } from './performanceBasedSchema';

const PerformanceBasedResult = () => {
  const { data, isLoading } = usePerformanceGrantFinalResult();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = useMemo(() => {
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
        Header: 'Total Marks Obtained',
        accessor: 'grant_received',
        Cell: ({ row }: Cell<PerformanceGrantResultData>) => {
          return row.original.grant_received || '';
        }
      },
      // {
      //   Header: 'Marks Prop',
      //   accessor: 'marks_prop',
      //   Cell: ({ row }: Cell<PerformanceGrantResultData>) => {
      //     return row.original.marks_prop || '';
      //   }
      // },
      {
        Header: 'Grant Received',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<PerformanceGrantResultData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <Layout.Main>
      <Layout.Header backToList>
        <HeaderTitle variant="h5" typeface="semiBold">
          Performance Grant Result
        </HeaderTitle>
      </Layout.Header>
      {data && data?.length > 0 ? (
        <Box className="flex-grow-1 px-4 mt-4">
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Performance Grant Summary
          </Text>
          <Box className="mt-4 h-100">
            <Table data={data || []} columns={columns} loading={isLoading} />
          </Box>
        </Box>
      ) : (
        <FlexBox className="flex-grow-1 w-100" direction="column" align="center" justify="center">
          <Box className="text-center">
            <Text color={gray[400]} variant="h5">
              No Grant Calculation Details
            </Text>
            <Text color={gray[400]}>
              Complete at least 1 Indicator Detail to View Results here.
            </Text>
            <Button
              className="btn btn-outline-primary mt-3"
              onClick={() => navigate(financialGrantPath.PerformanceBased)}>
              Go Back
            </Button>
          </Box>
        </FlexBox>
      )}
    </Layout.Main>
  );
};

export default PerformanceBasedResult;
