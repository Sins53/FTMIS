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
  useFedToLocalPeriodicPlanDetail,
  useFedToLocalPeriodicPlanImport,
  useFedToLocalPeriodicPlanListCVS
} from './periodicPlanQueries';
import PeriodicPlanForm from './PeriodicPlanForm';
import { FedToLocalPeriodicPlanData, PeriodicPlanInitialValue } from './periodicPlanSchema';
import { getTextByLanguage } from '@/i18n/i18n';
import Spinner from '@/components/Spinner/Spinner';

const PeriodicPlan = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: periodicPlanData, isLoading: periodicPlanLoading } =
    useFedToLocalPeriodicPlanDetail({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue
    });
  const { mutate, isLoading: importLoading } = useFedToLocalPeriodicPlanImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } = useFedToLocalPeriodicPlanListCVS();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Sutra-Portal', data.data);
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
  const [formData, setFormData] = useState(PeriodicPlanInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalPeriodicPlanData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'Comply',
        accessor: 'comply',
        Cell: ({ row }: Cell<FedToLocalPeriodicPlanData>) => {
          return row.original.comply || '';
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalPeriodicPlanData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalPeriodicPlanData>) => {
          const { id, comply } = row.original;
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
                  comply
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
      {periodicPlanLoading ? (
        <Spinner />
      ) : (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Formulation of Periodic Plan
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

          {periodicPlanData && periodicPlanData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={periodicPlanData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: periodicPlanData?.totalRecords || 0,
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
              title={'Periodic Plan Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <PeriodicPlanForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default PeriodicPlan;
