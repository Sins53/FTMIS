import { Box, Text } from '@/components/core';
import EmptySection from '@/components/EmptySection';
import Spinner from '@/components/Spinner/Spinner';
import Table from '@/components/Table/DataTable';
import { TableAction } from '@/components/Table/TableComponent';
import { SuccessToast } from '@/components/ToastNotifier/ToastNotifier';
import { useDebounce } from '@/hooks';
import { getTextByLanguage } from '@/i18n/i18n';
import { base } from '@/theme/colors';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import { downloadBlob } from '@/utils/fileDownload/fileDownloader';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import {
  useFedToLocalRevenueCollectionProgressDetail,
  useFedToLocalRevenueProgressImport,
  useFedToLocalRevenueProgressListCVS
} from './revenueCollectionProgressQueries';
import RevenueProgressForm from './RevenueProgressForm';
import {
  FedToLocalRevenueProgressData,
  RevenueCollectionProgressInitialValue
} from './revenueProgressSchema';

const RevenueCollectionProgress = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: revenueProgressData, isLoading: revenueDataLoading } =
    useFedToLocalRevenueCollectionProgressDetail({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue
    });
  const { mutate, isLoading: importLoading } = useFedToLocalRevenueProgressImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } =
    useFedToLocalRevenueProgressListCVS();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Revenue-Progress', data.data);
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
  const [formData, setFormData] = useState(RevenueCollectionProgressInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalRevenueProgressData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'Projected Revenue',
        accessor: 'previous_year_collected_revenue',
        Cell: ({ row }: Cell<FedToLocalRevenueProgressData>) => {
          return Number(row.original.previous_year_collected_revenue) || 0;
        }
      },
      {
        Header: 'Collected revenue',
        accessor: 'collected_revenue',
        Cell: ({ row }: Cell<FedToLocalRevenueProgressData>) => {
          return Number(row.original.last_year_collected_revenue) || 0;
        }
      },
      {
        Header: 'Growth Rate',
        accessor: 'growth_pct',
        Cell: ({ row }: Cell<FedToLocalRevenueProgressData>) => {
          return `${Number(row.original.growth_pct)} %` || 0;
        }
      },
      {
        Header: 'Difference',
        accessor: 'difference',
        Cell: ({ row }: Cell<FedToLocalRevenueProgressData>) => {
          return Number(row.original.difference) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalRevenueProgressData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalRevenueProgressData>) => {
          const { id, previous_year_collected_revenue, last_year_collected_revenue } = row.original;
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
                  previous_year_collected_revenue: Number(previous_year_collected_revenue),
                  last_year_collected_revenue: Number(last_year_collected_revenue)
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
      {revenueDataLoading ? (
        <Spinner />
      ) : (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Revenue Collection Progress
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

          {revenueProgressData && revenueProgressData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={revenueProgressData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: revenueProgressData?.totalRecords || 0,
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
              title={'Revenue Collection Progress Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <RevenueProgressForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default RevenueCollectionProgress;
