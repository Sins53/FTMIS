import { Box, FlexBox, Text } from '@/components/core';
import EmptySection from '@/components/EmptySection';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/DataTable';
import { getTextByLanguage } from '@/i18n/i18n';
import { base, blue } from '@/theme/colors';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import { StyledInformationBox } from '../indicatorsStyles';
import { useCalculateItAccessData, useItAccessDetailsData } from './itAccessQueries';
import { ItAccessDetailData } from './itAccessSchema';

const ItAccess = () => {
  const { data, isLoading: ItAccessDetailLoading } = useItAccessDetailsData();
  const { refetch, isLoading: CalculationLoading } = useCalculateItAccessData();
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<ItAccessDetailData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'It Access',
        accessor: 'it_access_index',
        Cell: ({ row }: Cell<ItAccessDetailData>) => {
          return row.original.it_access_index || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<ItAccessDetailData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {ItAccessDetailLoading ? (
        <Spinner />
      ) : (
        <Box className="h-100">
          {data && data?.length > 0 ? (
            <>
              <StyledInformationBox>
                <Text color={blue[900]}>
                  {"If IT Access  Data's are changed click button to Re-calculate"}
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
                  IT Access Details
                </Text>
                <Box className="flex-grow-1 bg-danger w-100 mt-4">
                  <Table data={data || []} columns={columns} loading={ItAccessDetailLoading} />
                </Box>
              </FlexBox>
            </>
          ) : (
            <>
              <EmptySection
                title="IT Access Details Not Calculated Yet"
                description="Press Button Below to Calculate IT Access Details"
                button
                btnText="Calculate"
                btnOnClick={() => refetch()}
              />
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default ItAccess;
