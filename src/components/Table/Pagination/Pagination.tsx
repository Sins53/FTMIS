import Button from '@/components/derived/Buttons/Buttons';
import React, { useState } from 'react';
import { PaginationWrapper, TableText, ThemedText } from '..';

const getTotalPage = (totalItems: number, countPerPage: number) => {
  if (totalItems < 10) return 1;
  return totalItems / countPerPage > parseInt((totalItems / countPerPage).toString())
    ? parseInt((totalItems / countPerPage).toString()) + 1
    : parseInt((totalItems / countPerPage).toString());
};

interface CustomPaginationNumbersProps {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  gotoPage: (page: number) => void;
  goPrevious: () => void;
  goNext: () => void;
}
const CustomPaginationNumbers = (props: CustomPaginationNumbersProps) => {
  const { gotoPage, currentPage, totalPages, goPrevious, goNext } = props;
  const sanitizePage = (a: string) => {
    return a.replaceAll('...', '');
  };
  const filterPages = (visiblePages: any, totalPages: any) => {
    return visiblePages.filter((page: any) => page <= totalPages);
  };
  const getVisiblePages = (page: any, total: any) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [`${1}...`, page - 1, page, page + 1, `...${total}`];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [`${1}...`, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, `...${total}`];
      }
    }
  };
  const a = getVisiblePages(currentPage, totalPages);
  return (
    <>
      <div className=" align-vertical">
        <ul className="pagination pagination-01 mb-0">
          <li className="page-item">
            <Button
              onClick={(e) => {
                e.preventDefault();
                goPrevious();
              }}
              className="page-link pagination-arrow mr-2"
              aria-label="Previous">
              <i className="ic-arrow-left1 text-gray-32"></i>
            </Button>
          </li>
          {a.map((page: any) => {
            return (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <Button
                  className="page-link"
                  onClick={() => {
                    let w = page + '';
                    if (w.includes('...')) {
                      w = sanitizePage(page);
                    }
                    const q = Number(w);
                    gotoPage(q - 1);
                  }}>
                  {page}
                </Button>
              </li>
            );
          })}
          <li className="page-item">
            <Button
              onClick={(e) => {
                e.preventDefault();
                goNext();
              }}
              className="page-link pagination-arrow ml-2"
              aria-label="Next">
              <i className="ic-arrow-right1 text-gray-32"></i>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

interface BackendPaginationProps {
  hasNext?: boolean;
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  rowPerPage: number;
  gotoPage: (pageNumber: number) => void;
  getRow?: (rowNumber: number) => void;
}

export default function Pagination(props: BackendPaginationProps) {
  const { getRow, currentPage, gotoPage, rowPerPage, totalRecords, totalPages } = props;
  const [pageSize, setPageSize] = useState(rowPerPage);
  return (
    <PaginationWrapper className="pagination-wrapper">
      <div className="des d-flex align-items-center mr-auto">
        <TableText>Showing</TableText>
        <div className="flex-shrink-1 mx-2">
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              getRow && getRow(Number(e.target.value));
              gotoPage(0);
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <TableText className="mr-2">rows out of</TableText>
        <TableText>
          <ThemedText className="d-inline">{totalRecords}</ThemedText> results
        </TableText>
      </div>

      <CustomPaginationNumbers
        currentPage={currentPage + 1}
        totalRecords={totalRecords}
        gotoPage={(pageNumber: number) => {
          gotoPage(pageNumber);
        }}
        totalPages={totalPages}
        goPrevious={() => {
          if (currentPage > 0) {
            gotoPage(currentPage - 1);
          } else {
            console.log('get previous');
          }
        }}
        goNext={() => {
          getTotalPage(totalRecords, pageSize) !== currentPage + 1 && gotoPage(currentPage + 1);
        }}
      />
    </PaginationWrapper>
  );
}
