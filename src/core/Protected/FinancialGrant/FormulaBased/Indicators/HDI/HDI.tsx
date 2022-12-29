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
import { useCalculateHdiData, useHdiDetailsData } from './hdiQueries';
import { HdiDetailData } from './hdiSchema';

const Hdi = () => {
  const { data, isLoading: HdiDetailLoading } = useHdiDetailsData();
  const { refetch, isLoading: CalculationLoading } = useCalculateHdiData();
  const { t } = useTranslation();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<HdiDetailData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'HDI',
        accessor: 'hdi',
        Cell: ({ row }: Cell<HdiDetailData>) => {
          return row.original.hdi || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<HdiDetailData>) => {
          return row.original.obtained_marks || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {HdiDetailLoading ? (
        <Spinner />
      ) : (
        <Box className="h-100">
          {data && data?.length > 0 ? (
            <>
              <StyledInformationBox>
                <Text color={blue[900]}>
                  {"If HDI Data's are changed click button to Re-calculate"}
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
                  HDI Details
                </Text>
                <Box className="flex-grow-1 bg-danger w-100 mt-4">
                  <Table data={data || []} columns={columns} loading={HdiDetailLoading} />
                </Box>
              </FlexBox>
            </>
          ) : (
            <>
              <EmptySection
                title="HDI Details Not Calculated Yet"
                description="Press Button Below to Calculate HDI Details"
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

export default Hdi;
