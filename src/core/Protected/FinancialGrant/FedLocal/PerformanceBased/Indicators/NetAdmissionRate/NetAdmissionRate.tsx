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
  useFedToLocalNetAdmissionRateDetail,
  useFedToLocalNetAdmissionRateImport,
  useFedToLocalNetAdmissionRateListCVS
} from './netAdmissionRateQueries';
import NetAdmissionRateForm from './NetAdmissionRateForm';
import {
  FedToLocalNetAdmissionRateData,
  NetAdmissionRateInitialValue
} from './netAdmissionRateSchema';
import { getTextByLanguage } from '@/i18n/i18n';
import Spinner from '@/components/Spinner/Spinner';

const NetAdmissionRate = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: netAdmissionRateData, isLoading: netAdmissionLoading } =
    useFedToLocalNetAdmissionRateDetail({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue
    });
  const { mutate, isLoading: importLoading } = useFedToLocalNetAdmissionRateImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } =
    useFedToLocalNetAdmissionRateListCVS();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Capital-Expense', data.data);
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
  const [formData, setFormData] = useState(NetAdmissionRateInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalNetAdmissionRateData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'Children Expected to Attend School',
        accessor: 'school_going_children',
        Cell: ({ row }: Cell<FedToLocalNetAdmissionRateData>) => {
          return Number(row.original.school_going_children) || 0;
        }
      },
      {
        Header: 'Children Attending School',
        accessor: 'studying_children',
        Cell: ({ row }: Cell<FedToLocalNetAdmissionRateData>) => {
          return Number(row.original.studying_children) || 0;
        }
      },
      {
        Header: 'Net Admission Rate',
        accessor: 'net_admission_rate',
        Cell: ({ row }: Cell<FedToLocalNetAdmissionRateData>) => {
          return `${Number(row.original.net_admission_rate)} %` || 0;
        }
      },
      {
        Header: 'Difference',
        accessor: 'difference',
        Cell: ({ row }: Cell<FedToLocalNetAdmissionRateData>) => {
          return Number(row.original.difference) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalNetAdmissionRateData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalNetAdmissionRateData>) => {
          const { id, school_going_children, studying_children } = row.original;
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
                  school_going_children: Number(school_going_children),
                  studying_children: Number(studying_children)
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
      {netAdmissionLoading ? (
        <Spinner />
      ) : (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Net Admission Rate
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

          {netAdmissionRateData && netAdmissionRateData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={netAdmissionRateData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: netAdmissionRateData?.totalRecords || 0,
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
              title={'Net Admission Rate Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <NetAdmissionRateForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default NetAdmissionRate;
