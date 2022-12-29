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
  useFedToLocalBerujuDetail,
  useFedToLocalBerujuImport,
  useFedToLocalBerujuListCVS
} from './berujuQueries';
import BerujuForm from './BerujuForm';
import { FedToLocalBerujuData, BerujuInitialValue } from './berujuSchema';
import { getTextByLanguage } from '@/i18n/i18n';
import Spinner from '@/components/Spinner/Spinner';

const Beruju = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: berujuData, isLoading: berujuLoading } = useFedToLocalBerujuDetail({
    page_size: rowPerPage,
    page: currentPage + 1,
    search: debouncedValue
  });
  const { mutate, isLoading: importLoading } = useFedToLocalBerujuImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } = useFedToLocalBerujuListCVS();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Beruju', data.data);
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
  const [formData, setFormData] = useState(BerujuInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalBerujuData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'Audited Amount',
        accessor: 'audited_amount',
        Cell: ({ row }: Cell<FedToLocalBerujuData>) => {
          return Number(row.original.audited_amount) || 0;
        }
      },
      {
        Header: 'Irregularities Amount',
        accessor: 'irregularities_amount',
        Cell: ({ row }: Cell<FedToLocalBerujuData>) => {
          return Number(row.original.irregularities_amount) || 0;
        }
      },
      {
        Header: 'Expense %',
        accessor: 'irregularities_pct',
        Cell: ({ row }: Cell<FedToLocalBerujuData>) => {
          return `${Number(row.original.irregularities_pct)} %` || 0;
        }
      },
      {
        Header: 'Difference',
        accessor: 'difference',
        Cell: ({ row }: Cell<FedToLocalBerujuData>) => {
          return Number(row.original.difference) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalBerujuData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalBerujuData>) => {
          const { id, audited_amount, irregularities_amount } = row.original;
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
                  audited_amount: Number(audited_amount),
                  irregularities_amount: Number(irregularities_amount)
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
      {berujuLoading ? (
        <Spinner />
      ) : (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Beruju
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

          {berujuData && berujuData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={berujuData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: berujuData?.totalRecords || 0,
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
              title={'Beruju Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <BerujuForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default Beruju;
