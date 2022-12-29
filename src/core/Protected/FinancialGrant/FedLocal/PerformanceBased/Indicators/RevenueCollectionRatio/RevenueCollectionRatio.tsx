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
  useFedToLocalRevenueCollectionRatioDetail,
  useFedToLocalRevenueRatioImport,
  useFedToLocalRevenueRatioListCVS
} from './revenueCollectionRatioQueries';
import RevenueRatioForm from './RevenueRatioForm';
import {
  FedToLocalRevenueRatioData,
  RevenueCollectionRatioInitialValue
} from './revenueRatioSchema';

const RevenueCollectionRatio = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: revenueRatioData, isLoading: revenueDataLoading } =
    useFedToLocalRevenueCollectionRatioDetail({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue
    });
  const { mutate, isLoading: importLoading } = useFedToLocalRevenueRatioImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } = useFedToLocalRevenueRatioListCVS();
  const fileRef = useRef<HTMLInputElement>(null);
  console.log(revenueRatioData, 'qwe', mutate, setCurrentPage, setRowPerPage);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Revenue-Ratio', data.data);
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
  const [formData, setFormData] = useState(RevenueCollectionRatioInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalRevenueRatioData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'Projected Revenue',
        accessor: 'projected_revenue',
        Cell: ({ row }: Cell<FedToLocalRevenueRatioData>) => {
          return Number(row.original.projected_revenue) || 0;
        }
      },
      {
        Header: 'Collected revenue',
        accessor: 'collected_revenue',
        Cell: ({ row }: Cell<FedToLocalRevenueRatioData>) => {
          return Number(row.original.collected_revenue) || 0;
        }
      },
      {
        Header: 'Growth Rate',
        accessor: 'revenue_pct',
        Cell: ({ row }: Cell<FedToLocalRevenueRatioData>) => {
          return `${Number(row.original.revenue_pct)} %` || 0;
        }
      },
      {
        Header: 'Difference',
        accessor: 'difference',
        Cell: ({ row }: Cell<FedToLocalRevenueRatioData>) => {
          return Number(row.original.difference) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalRevenueRatioData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalRevenueRatioData>) => {
          const { id, projected_revenue, collected_revenue } = row.original;
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
                  projected_revenue: Number(projected_revenue),
                  collected_revenue: Number(collected_revenue)
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
            Revenue Collection Ratio
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

          {revenueRatioData && revenueRatioData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={revenueRatioData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: revenueRatioData?.totalRecords || 0,
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
              title={'Revenue Collection Ratio Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <RevenueRatioForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default RevenueCollectionRatio;
