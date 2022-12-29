import { Badge } from '@/components/derived';
import Table from '@/components/Table/DataTable';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_TIMEOUT } from '@/utils/constants';
import React, { useEffect, useMemo, useState } from 'react';
import { TableAction } from '@/components/Table/TableComponent';
import { SuccessToast } from '@/components/ToastNotifier/ToastNotifier';
import { getTextByLanguage } from '@/i18n/i18n';
import { downloadBlob } from '@/utils/fileDownload/fileDownloader';
import { useTranslation } from 'react-i18next';
import { Cell } from 'react-table';
import {
  useFiscalLocalGovernmentData,
  useFiscalLocalGovernmentImport,
  useFiscalLocalGovernmentListCVS
} from './localGovernmentQueries';
import {
  FiscalLocalGovernmentData,
  FiscalLocalGovernmentInitialValue,
  LocalGovernmentFilterInitialValues
} from './localGovernmentSchema';
import LocalGovernmentSetupForm from './LocalGovernmentSetupForm';
import LocalGovernmentFilter from './LocalGovernmentFilter';

function LocalGovernmentTable() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(FiscalLocalGovernmentInitialValue);
  const [importFile, setImportFile] = useState<File>();
  const { mutate: mutateImport, isLoading: importLoading } = useFiscalLocalGovernmentImport();
  const { mutate: exportFileMutate, isLoading: loadingExport } = useFiscalLocalGovernmentListCVS();

  const [filterData, setFilterData] = useState<typeof LocalGovernmentFilterInitialValues>(
    LocalGovernmentFilterInitialValues
  );

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Individual-User', data.data);
          SuccessToast('Successful');
        }
      }
    });
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleImport = (file: File) => {
    mutateImport({ file });
  };
  useEffect(() => {
    if (importFile) {
      handleImport(importFile);
    }
  }, [importFile]);

  const { data: localGovernmentData, isLoading: localGovernmentLoading } =
    useFiscalLocalGovernmentData({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue,
      fiscal_year: filterData?.fiscal_year?.value,
      province: filterData.province?.value
    });

  const columns = useMemo(() => {
    const column = [
      {
        Header: t('common:table.local_government') + ' ' + t('common:table.code'),
        Cell: ({ row }: Cell<FiscalLocalGovernmentData>) => {
          return row.original.localbody.localbody_code || '';
        }
      },
      {
        Header: 'Local Government English',
        accessor: 'name_en',
        Cell: ({ row }: Cell<FiscalLocalGovernmentData>) => {
          return row.original.localbody.name_en || '';
        }
      },
      {
        Header: 'Local Government Nepali',
        accessor: 'name_np',
        Cell: ({ row }: Cell<FiscalLocalGovernmentData>) => {
          return row.original.localbody.name_np || '';
        }
      },
      {
        Header: 'Province',
        Cell: ({ row }: Cell<FiscalLocalGovernmentData>) => {
          return (
            getTextByLanguage(
              row.original.localbody.province.name_en,
              row.original.localbody.province.name_np
            ) || ''
          );
        }
      },
      {
        Header: t('common:table.status'),
        Cell: ({ row }: Cell<FiscalLocalGovernmentData>) => {
          return (
            <>
              {row.original?.details ? (
                <Badge bgColor="success" text={'Complete'} />
              ) : (
                <Badge bgColor="danger" text={'Incomplete'} />
              )}
            </>
          );
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FiscalLocalGovernmentData>) => {
          const { id, name_en } = row.original.localbody;

          return (
            <TableAction
              handleEditClick={
                row.original.details
                  ? () => {
                      toggle && toggle();
                      setFormData({
                        id: row.original.details?.id,
                        localbody: id,
                        name: name_en,
                        population: row.original?.details?.population ?? '',
                        area: row.original?.details?.area ?? '',
                        road: row.original?.details?.road ?? '',
                        sed: row.original?.details?.sed ?? '',
                        hdi: row.original?.details?.hdi ?? '',
                        it_access: row.original?.details?.it_access ?? '',
                        drinking_water: row.original?.details?.drinking_water ?? ''
                      });
                    }
                  : undefined
              }
              handleConfigurationClick={
                row.original.details === null
                  ? () => {
                      toggle && toggle();
                      setFormData({
                        ...formData,
                        localbody: id,
                        name: name_en
                      });
                    }
                  : undefined
              }
            />
          );
        }
      }
    ];
    return column;
  }, [filterData]);

  return (
    <>
      <Table
        data={localGovernmentData?.records || []}
        columns={columns}
        loading={localGovernmentLoading}
        serverPagination
        isSearch
        isServerSearch
        serverSearchText={searchValue}
        setServerSearchText={setSearchValue}
        serverPaginationParams={{
          currentPage,
          rowPerPage,
          totalItem: localGovernmentData?.totalRecords || 0,
          gotoPage: (num: number) => {
            setCurrentPage(num);
          },
          getRow: (number: number) => {
            setRowPerPage(number);
          }
        }}
        isImportExport
        importExportLoading={importLoading || loadingExport}
        importExportProps={{
          handleImportCSV: setImportFile,
          handleExportCSV: exportAsCSV
        }}
        isFilter
        TableFilterComponent={
          <LocalGovernmentFilter filterData={filterData} setFilterData={setFilterData} />
        }
      />
      <LocalGovernmentSetupForm toggle={toggle} isOpen={isOpen} formData={formData} />
    </>
  );
}

export default LocalGovernmentTable;
