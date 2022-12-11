import { Box, FlexBox, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import Table from '@/components/Table/DataTable';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { base, gray } from '@/theme/colors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Cell } from 'react-table';
import { useEqualizationGrantFinalResult } from './financialGrantQueries';
import { FinalGrantData } from './financialGrantSchema';

const FinalResultTable = () => {
  const { data, isLoading } = useEqualizationGrantFinalResult();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<FinalGrantData>) => {
          return row.original.province || '';
        }
      },
      {
        Header: 'Minimum Grant',
        accessor: 'minimum_grant',
        Cell: ({ row }: Cell<FinalGrantData>) => {
          return row.original.minimum_grant || '';
        }
      },
      {
        Header: 'Performance Based',
        accessor: 'performance_based',
        Cell: ({ row }: Cell<FinalGrantData>) => {
          return row.original.performance_based || '';
        }
      },
      {
        Header: 'Formula Based',
        accessor: 'formula_based',
        Cell: ({ row }: Cell<FinalGrantData>) => {
          return row.original.formula_based || '';
        }
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ row }: Cell<FinalGrantData>) => {
          return row.original.total || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <Layout.Main>
      <Layout.Header backToList>
        <HeaderTitle variant="h5" typeface="semiBold">
          Final Grant Result
        </HeaderTitle>
      </Layout.Header>
      {data && data?.length > 0 ? (
        <Box className="flex-grow-1 px-4 mt-4">
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Total Equalization Grant Received
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
            <Text color={gray[400]}>Complete at least 1 Grant to View Results here.</Text>
            <Button
              className="btn btn-outline-primary mt-3"
              onClick={() => navigate(financialGrantPath.FinancialGrant)}>
              Go Back
            </Button>
          </Box>
        </FlexBox>
      )}
    </Layout.Main>
  );
};

export default FinalResultTable;
