import Table from '@/components/Table/DataTable';
import { LOCALBODY_TYPE } from '@/shared/enums/localbody-type';
import React, { useMemo, useState } from 'react';
import { Cell } from 'react-table';
import { useLocalGovernmentData } from './localGovernmentQueries';
import { LocalGovernmentResponse } from './localGovernmentSchema';

function LocalGovernmentTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const { data: localGovernmentData, isLoading: localGovernmentLoading } = useLocalGovernmentData({
    page_size: rowPerPage,
    page: currentPage + 1
  });

  const columns = useMemo(() => {
    const column = [
      {
        Header: 'Local Body Code',
        Cell: ({ row }: Cell<LocalGovernmentResponse>) => {
          return row.original.localbody_code || '';
        }
      },

      {
        Header: 'Local Government English',
        accessor: 'name_en',
        Cell: ({ row }: Cell<LocalGovernmentResponse>) => {
          return row.original.name_en || '';
        }
      },
      {
        Header: 'Local Government Nepali',
        accessor: 'name_np',
        Cell: ({ row }: Cell<LocalGovernmentResponse>) => {
          return row.original.name_np || '';
        }
      },
      {
        Header: 'Local Body Type',
        Cell: ({ row }: Cell<LocalGovernmentResponse>) => {
          return LOCALBODY_TYPE[Number(row.original.localbody_type)] || '';
        }
      },
      {
        Header: 'Province',
        Cell: ({ row }: Cell<LocalGovernmentResponse>) => {
          return row.original.province || '';
        }
      }
    ];
    return column;
  }, []);

  return (
    <>
      <Table
        data={localGovernmentData?.records || []}
        columns={columns}
        loading={localGovernmentLoading}
        serverPagination
        isSearch
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
      />
    </>
  );
}

export default LocalGovernmentTable;
