import React, { useState, useMemo } from 'react';
import Table from '@/components/Table/DataTable';
import { Cell } from 'react-table';
import { useTranslation } from 'react-i18next';
import { getTextByLanguage } from '@/i18n/i18n';
import { FormulaGrantData } from './formulaBasedSchema';
import FiscalYearFilterComponent from '../FiscalYearFilterComponent';
import { useFormulaGrantFinalResult } from './formulaBasedQueries';
import { Box, FlexBox } from '@/components/core';
import EmptySection from '@/components/EmptySection';
import Button from '@/components/derived/Buttons/Buttons';
import { sanitizeURL } from '@/shared/utils';
import { financialGrantPath } from '@/routes/protected/financialGrant';
import { useNavigate } from 'react-router-dom';

const FormulaResultTable = () => {
  const [fiscalYear, setFiscalYear] = useState<string | number>('');
  const { t } = useTranslation();
  const { data: formulaBasedGrantFinalResult, isLoading } = useFormulaGrantFinalResult();
  const navigate = useNavigate();

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Province',
        Cell: ({ row }: Cell<FormulaGrantData>) => {
          return (
            getTextByLanguage(row.original.province.name_en, row.original.province.name_np) || ''
          );
        }
      },
      {
        Header: 'Grant Received',
        accessor: 'grant_received',
        Cell: ({ row }: Cell<FormulaGrantData>) => {
          return Number(row.original.grant_received) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FormulaGrantData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {formulaBasedGrantFinalResult && formulaBasedGrantFinalResult?.length > 0 ? (
        <Box className="flex-grow-1 w-100">
          <Table
            isSearch
            isFilter
            data={formulaBasedGrantFinalResult || []}
            columns={columns}
            loading={isLoading}
            TableFilterComponent={
              <FiscalYearFilterComponent fiscalYear={fiscalYear} setFiscalYear={setFiscalYear} />
            }
          />
        </Box>
      ) : (
        <FlexBox align="center" justify="center" className="flex-grow-1 w-100">
          <Box className="text-center">
            <EmptySection
              title={'Formula Based Indicators Details Not Filled'}
              description={' Click Below to Go to Formula Indicator Details'}
            />
            <Button
              className="btn btn-outline-primary mt-3"
              onClick={() => navigate(sanitizeURL(financialGrantPath.FormulaBasedIndicators))}>
              {'View Details'}
            </Button>
          </Box>
        </FlexBox>
      )}
    </>
  );
};

export default FormulaResultTable;
