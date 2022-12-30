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
  useFedToLocalStudentConsistencyRateDetail,
  useFedToLocalStudentConsistencyRateImport,
  useFedToLocalStudentConsistencyRateListCVS
} from './studentConsistencyRateQueries';
import StudentConsistencyRateForm from './StudentConsistencyRateForm';
import {
  FedToLocalStudentConsistencyRateData,
  StudentConsistencyRateInitialValue
} from './studentConsistencyRateSchema';
import { getTextByLanguage } from '@/i18n/i18n';
import Spinner from '@/components/Spinner/Spinner';

const StudentConsistencyRate = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce(searchValue, DEBOUNCE_TIMEOUT);
  const [importFile, setImportFile] = useState<File>();
  const { data: studentConsistencyRateData, isLoading: studentConsistencyLoading } =
    useFedToLocalStudentConsistencyRateDetail({
      page_size: rowPerPage,
      page: currentPage + 1,
      search: debouncedValue
    });
  const { mutate, isLoading: importLoading } = useFedToLocalStudentConsistencyRateImport();
  const { mutate: exportFileMutate, isLoading: exportLoading } =
    useFedToLocalStudentConsistencyRateListCVS();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportAsCSV = () => {
    exportFileMutate(undefined, {
      onSuccess: (data: any) => {
        if (data.data instanceof Blob) {
          downloadBlob('Fed-To-Local-Student-Consistency-Rate', data.data);
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
  const [formData, setFormData] = useState(StudentConsistencyRateInitialValue);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Government',
        accessor: 'localbody.name_en',
        Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
          return (
            getTextByLanguage(row.original.localbody.name_en, row.original.localbody.name_np) || ''
          );
        }
      },
      {
        Header: 'Students in Class 8',
        accessor: 'students_in_class_eight',
        Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
          return Number(row.original.students_in_class_eight) || 0;
        }
      },
      {
        Header: 'Students in Class 9',
        accessor: 'students_in_class_nine',
        Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
          return Number(row.original.students_in_class_nine) || 0;
        }
      },
      {
        Header: 'Consistency Rate',
        accessor: 'consistency_rate',
        Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
          return `${Number(row.original.consistency_rate)} %` || 0;
        }
      },
      // {
      //   Header: 'Average %',
      //   accessor: 'average_expense',
      //   Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
      //     return `${Number(row.original.average_expense)} %` || 0;
      //   }
      // },
      {
        Header: 'Difference',
        accessor: 'difference',
        Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
          return Number(row.original.difference) || 0;
        }
      },
      {
        Header: 'Marks',
        accessor: 'obtained_marks',
        Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
          return Number(row.original.obtained_marks) || 0;
        }
      },
      {
        Header: t('common:table.action'),
        Cell: ({ row }: Cell<FedToLocalStudentConsistencyRateData>) => {
          const { id, students_in_class_eight, students_in_class_nine } = row.original;
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
                  students_in_class_eight: Number(students_in_class_eight),
                  students_in_class_nine: Number(students_in_class_nine)
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
      {studentConsistencyLoading ? (
        <Spinner />
      ) : (
        <>
          <Text variant="h6" color={base.primary} typeface="semiBold" className="p-3 ">
            Student Consistency Rate
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

          {studentConsistencyRateData && studentConsistencyRateData?.records.length > 0 ? (
            <Box className="px-3 flex-grow-1">
              <Table
                data={studentConsistencyRateData.records}
                columns={columns}
                isSearch
                isServerSearch
                serverSearchText={searchValue}
                setServerSearchText={setSearchValue}
                serverPagination
                serverPaginationParams={{
                  currentPage,
                  rowPerPage,
                  totalItem: studentConsistencyRateData?.totalRecords || 0,
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
              title={'Student Consistency Rate Data Not Set'}
              description={'Click below to Upload CSV'}
              button
              btnText={'Upload CSV'}
              btnOnClick={() => fileRef?.current?.click()}
            />
          )}

          <StudentConsistencyRateForm isOpen={isOpen} formData={formData} toggle={toggle} />
        </>
      )}
    </>
  );
};

export default StudentConsistencyRate;
