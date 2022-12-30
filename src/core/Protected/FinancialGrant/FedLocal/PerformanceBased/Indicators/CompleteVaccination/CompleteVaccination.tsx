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
  useFedToLocalCompleteVaccinationDetail,
  useFedToLocalCompleteVaccinationImport,
  useFedToLocalCompleteVaccinationListCVS
} from './completeVaccinationQueries';
import CompleteVaccinationForm from './CompleteVaccinationForm';
import {
  FedToLocalCompleteVaccinationData,
  CompleteVaccinationInitialValue
} from './completeVaccinationSchema';
import { getTextByLanguage } from '@/i18n/i18n';
import Spinner from '@/components/Spinner/Spinner';

const CompleteVaccination = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: completeVaccinationData, isLoading: completeVaccinationLoading } =
    useFedToLocalCompleteVaccinationDetail({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue
    });
  const { mutate, isLoading: importLoading } = useFedToLocalCompleteVaccinationImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } =
    useFedToLocalCompleteVaccinationListCVS();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Complete Vaccination', data.data);
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
  const [formData, setFormData] = useState(CompleteVaccinationInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'No. of Children Below 24 months',
        accessor: 'below_24_months_children',
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          return Number(row.original.below_24_months_children) || 0;
        }
      },
      {
        Header: 'No. of Children Taking All Vaccinations',
        accessor: 'childrens_taking_all_vaccination',
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          return Number(row.original.childrens_taking_all_vaccination) || 0;
        }
      },
      {
        Header: 'Rate',
        accessor: 'rate',
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          return `${Number(row.original.rate)} %` || 0;
        }
      },
      {
        Header: 'Average %',
        accessor: 'average_rate',
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          return `${Number(row.original.average_rate)} %` || 0;
        }
      },
      {
        Header: 'Difference',
        accessor: 'difference',
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          return Number(row.original.difference) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalCompleteVaccinationData>) => {
          const { id, below_24_months_children, childrens_taking_all_vaccination } = row.original;
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
                  below_24_months_children: Number(below_24_months_children),
                  childrens_taking_all_vaccination: Number(childrens_taking_all_vaccination)
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
      {completeVaccinationLoading ? (
        <Spinner />
      ) : (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Complete Vaccination
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

          {completeVaccinationData && completeVaccinationData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={completeVaccinationData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: completeVaccinationData?.totalRecords || 0,
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
              title={'Complete Vaccination Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <CompleteVaccinationForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default CompleteVaccination;
