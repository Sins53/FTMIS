import { Box, FlexBox, Text } from '@/components/core';
import Layout from '@/components/layout';
import Table from '@/components/Table/DataTable';
import { gray } from '@/theme/colors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { useFedToLocalMinimumGrantPercentData } from './minimumGrantqueries';
import { FedToLocalMinimumGrantData } from './minimumGrantschema';

interface MinimumGrantProps {
  minimumGrantData: FedToLocalMinimumGrantData[];
}

const MinimumGrantView = ({ minimumGrantData }: MinimumGrantProps) => {
  const { t } = useTranslation();
  const { data: minGrantPercent } = useFedToLocalMinimumGrantPercentData();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Population Range',
        accessor: 'population_range',
        Cell: ({ row }: Cell<FedToLocalMinimumGrantData>) => {
          return `${row.original.population_range.min_pop_range} - ${row.original.population_range.max_pop_range}`;
        }
      },
      {
        Header: 'Number of Local Body',
        accessor: 'number_of_localbody',
        Cell: ({ row }: Cell<FedToLocalMinimumGrantData>) => {
          return row.original.number_of_localbody || 0;
        }
      },
      {
        Header: 'Minimum Grant Amount',
        accessor: 'minimum_grant_amount',
        Cell: ({ row }: Cell<FedToLocalMinimumGrantData>) => {
          return row.original.minimum_grant_amount || 0;
        }
      },
      {
        Header: 'Total Minimum Grant',
        accessor: 'total_minimum_grant',
        Cell: ({ row }: Cell<FedToLocalMinimumGrantData>) => {
          return row.original.total_minimum_grant || 0;
        }
      }
    ];
    return column;
  }, [t]);
  console.log(minimumGrantData, 'qwe', columns);
  return (
    <Layout.Container stretch>
      <Layout.Flex>
        {minGrantPercent && minGrantPercent.percent && (
          <>
            <FlexBox justify="space-between" align="center" className="w-100 my-4">
              <Box>
                <Text variant="h3" typeface="semiBold" color={gray[600]}>
                  Rs.{Number(minGrantPercent?.budget?.amount)}
                </Text>
                <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                  Total Amount for {minGrantPercent?.fiscal_year?.name}
                </Text>
              </Box>
              <FlexBox>
                <Box className="pr-3 mr-3 border-right">
                  <Text variant="h3" typeface="semiBold" color={gray[600]}>
                    Rs.{Number(minGrantPercent?.total_minimum_grant_amount)}
                  </Text>
                  <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                    Performance Grant Amount
                  </Text>
                </Box>
                <Box>
                  <Text variant="h3" typeface="semiBold" color={gray[600]}>
                    {Number(minGrantPercent?.percent)}%
                  </Text>
                  <Text variant="h6" className="mt-2" typeface="medium" color={gray[400]}>
                    Performance Grant Percent
                  </Text>
                </Box>
              </FlexBox>
            </FlexBox>
            <>
              <FlexBox className="flex-grow-1 w-100 mb-4">
                <Table data={minimumGrantData || []} columns={columns} isSearch />
              </FlexBox>
            </>
          </>
        )}
      </Layout.Flex>
    </Layout.Container>
  );
};

export default MinimumGrantView;
