import { Box, Text } from '@/components/core';
import EmptySection from '@/components/EmptySection';
import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { SuccessToast } from '@/components/ToastNotifier/ToastNotifier';
import { useDebounce } from '@/hooks';
import { base } from '@/theme/colors';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { downloadBlob } from '@/utils/fileDownload/fileDownloader';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import {
  useFedToLocalTotalExpenseRatioDetail,
  useFedToLocalTotalExpenseRatioImport,
  useFedToLocalTotalExpenseRatioListCVS
} from './totalExpenseRatioQueries';
import TotalExpenseRatioForm from './TotalExpenseRatioForm';
import {
  FedToLocalTotalExpenseRatioData,
  TotalExpenseRatioInitialValue
} from './totalExpenseRatioSchema';
import { getTextByLanguage } from '@/i18n/i18n';
import Spinner from '@/components/Spinner/Spinner';

const TotalExpenseRatio = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: totalExpenseRatioData, isLoading: totalExpenseLoading } =
    useFedToLocalTotalExpenseRatioDetail({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue
    });
  const { mutate, isLoading: importLoading } = useFedToLocalTotalExpenseRatioImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } =
    useFedToLocalTotalExpenseRatioListCVS();
  const fileRef = useRef<HTMLInputElement>(null);
  console.log(totalExpenseRatioData, 'qwe', mutate, setCurrentPage, setRowPerPage);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Total-Expense', data.data);
          SuccessToast('Successful');
        }
      }
    });
  };
  const handleImport = (file: File) => {
    mutate({ file });
  };
  useEffect(() => {
    if (importFile) {
      handleImport(importFile);
    }
  }, [importFile]);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setImportFile && e.target.files) {
      setImportFile(e.target.files?.[0]);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(TotalExpenseRatioInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalTotalExpenseRatioData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'Allocated Expense',
        accessor: 'allocation_expense',
        Cell: ({ row }: Cell<FedToLocalTotalExpenseRatioData>) => {
          return Number(row.original.allocation_expense) || 0;
        }
      },
      {
        Header: 'Real Expense',
        accessor: 'real_expense',
        Cell: ({ row }: Cell<FedToLocalTotalExpenseRatioData>) => {
          return Number(row.original.real_expense) || 0;
        }
      },
      {
        Header: 'Expense %',
        accessor: 'average_pct',
        Cell: ({ row }: Cell<FedToLocalTotalExpenseRatioData>) => {
          return `${Number(row.original.average_pct)} %` || 0;
        }
      },
      {
        Header: 'Difference',
        accessor: 'difference',
        Cell: ({ row }: Cell<FedToLocalTotalExpenseRatioData>) => {
          return Number(row.original.difference) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalTotalExpenseRatioData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalTotalExpenseRatioData>) => {
          const { id, allocation_expense, real_expense } = row.original;
          const name = row.original.localbody.name_en;
          const fiscal_year = row.original.fiscal_year.name;
          return (
            <TableAction
              handleEditClick={() => {
                toggle();
                setFormData({
                  id,
                  name,
                  fiscal_year,
                  allocation_expense: Number(allocation_expense),
                  real_expense: Number(real_expense)
                });
              }}
            />
          );
        }
      }
    ];
    return column;
  }, [t]);

  return (
    <>
      {totalExpenseLoading ? (
        <Spinner />
      ) : (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Total Expense Ratio
          </Text>
          <input
            name="file"
            id="file"
            hidden
            type="file"
            ref={fileRef}
            accept={'.csv'}
            onDrag={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={handleFileUpload}
          />

          {totalExpenseRatioData && totalExpenseRatioData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={totalExpenseRatioData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: totalExpenseRatioData?.totalRecords || 0,
                  gotoPage: (num: number) => {
                    setCurrentPage(num);
                  },
                  getRow: (number: number) => {
                    setRowPerPage(number);
                  }
                }}
                isImportExport
                importExportLoading={importLoading || exportLoading}
                importExportProps={{
                  handleImportCSV: setImportFile,
                  handleExportCSV: exportAsCSV
                }}
              />
            </Box>
          ) : (
            <EmptySection
              title={'Total Expense Ratio Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <TotalExpenseRatioForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default TotalExpenseRatio;
