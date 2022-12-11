import { Box, FlexBox, Text } from '@/components/core';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import Table from '@/components/Table/DataTable';
import { base, blue, coolGray } from '@/theme/colors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { StyledInformationBox } from '../indicatorsStyles';
import {
  useCalculateRevenueConditionData,
  useRevenueConditionDetailsData
} from './revenueConditionQueries';
import { RevenueConditionDetailData } from './revenueConditionSchema';

const RevenueCondition = () => {
  const { data, isLoading: RevenueConditionDetailLoading } = useRevenueConditionDetailsData();
  const { refetch, isLoading: CalculationLoading } = useCalculateRevenueConditionData();
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<RevenueConditionDetailData>) => {
          return row.original.province || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<RevenueConditionDetailData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <Box className="h-100">
      {data && data?.length > 0 ? (
        <>
          <StyledInformationBox>
            <Text color={blue[900]}>
              {"If Revenue Condition Data's are changed click button to Re-calculate"}
            </Text>
            <LoadingButton
              className="btn btn-outline-primary"
              onClick={() => refetch()}
              loading={CalculationLoading}>
              Re-Calculate
            </LoadingButton>
          </StyledInformationBox>
          <FlexBox direction="column" className="w-100 h-100 px-4">
            <Text variant="h6" color={base.primary} typeface="semiBold">
              Revenue Condition Details
            </Text>
            <Box className="flex-grow-1 bg-danger w-100 mt-4">
              <Table data={data || []} columns={columns} loading={RevenueConditionDetailLoading} />
            </Box>
          </FlexBox>
        </>
      ) : (
        <>
          <FlexBox align="center" justify="center" className="h-100">
            <Box className="text-center">
              <Text variant="h5" color={coolGray[700]}>
                Revenue Condition Details Not Calculated Yet
              </Text>
              <Text color={coolGray[700]}>
                Press Button Below to Calculate Revenue Condition Details
              </Text>
              <LoadingButton
                className="btn btn-outline-primary mt-3"
                onClick={() => refetch()}
                loading={CalculationLoading}>
                Calculate
              </LoadingButton>
            </Box>
          </FlexBox>
        </>
      )}
    </Box>
  );
};

export default RevenueCondition;
