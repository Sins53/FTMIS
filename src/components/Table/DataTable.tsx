import React, { ReactElement, useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination, useSortBy } from 'react-table';
import { PaginationWrapper, StyledTable, TableContainer, TableText, ThemedText } from '.';
import Button from '../derived/Buttons/Buttons';
import Layout from '../layout';
import '../LoadingButton/loading-theme.scss';
import { ImportExportProps } from './TableComponent';
import TableFilter from './TableFilter';
import { TableSkeleton } from './TableSkeleton';

export enum TableSize {
  sm,
  md,
  lg,
  xl
}

const getTotalPage = (totalItems: number, countPerPage: number) => {
  if (totalItems < 10) return 1;
  return totalItems / countPerPage > parseInt((totalItems / countPerPage).toString())
    ? parseInt((totalItems / countPerPage).toString()) + 1
    : parseInt((totalItems / countPerPage).toString());
};

export interface BackendPaginationProps {
  currentPage: number;
  rowPerPage: number;
  totalItem: number;
  gotoPage: (pageNumber: number) => void;
  getRow?: (rowNumber: number) => void;
}
export interface DatatableProps {
  columns: any[];
  data: any;
  className?: string;
  striped?: boolean;
  size?: TableSize;
  pagination?: boolean;
  loading?: boolean;
  isFilter?: boolean;
  isSearch?: boolean;
  isOrdering?: boolean;

  /**
   * For Server Side Pagination
   */
  serverPagination?: boolean;
  serverPaginationParams?: BackendPaginationProps;

  TableFilterComponent?: React.ComponentType;

  /**
   * For Server Side Pagination
   */
  isServerSearch?: boolean;
  serverSearchText?: string;
  setServerSearchText?: (text: string) => void;

  // For Import Export
  isImportExport?: boolean;
  btnName?: string;
  importExportLoading?: boolean;
  importExportProps?: ImportExportProps;
}

interface CustomPaginationNumbersProps {
  currentPage: number;
  totalItem: number;
  rowPerPage: number;
  gotoPage: (page: number) => void;
  goPrevious: () => void;
  goNext: () => void;
}

export const CustomPaginationNumbers = (props: CustomPaginationNumbersProps) => {
  const { gotoPage, currentPage, goPrevious, goNext, totalItem, rowPerPage } = props;
  const totalPages = getTotalPage(totalItem, rowPerPage);
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
  const arr = getVisiblePages(currentPage, totalPages);
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
          {arr.map((page: any) => {
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

export default function Table(props: DatatableProps): ReactElement {
  const {
    columns,
    data = [],
    className,
    size,
    pagination = false,
    loading,
    striped = true,
    serverPaginationParams,
    serverPagination = false,

    //Server side search
    isServerSearch,
    serverSearchText,
    setServerSearchText,

    // For CSV import
    isImportExport = false,
    btnName,
    importExportLoading = false,
    importExportProps
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [initPagination, setinitPagination] = useState(false);

  useEffect(() => {
    setinitPagination(pagination || serverPagination);
  }, [pagination, serverPagination]);

  return (
    <TableContainer direction="column">
      {(props.isFilter || props.isOrdering || props.isSearch || isServerSearch) && (
        <TableFilter
          searchKey={globalFilter}
          setSearchKey={setGlobalFilter}
          isFilter={props.isFilter}
          isSearch={props.isSearch}
          isOrdering={props.isOrdering}
          TableFilterComponent={props.TableFilterComponent}
          isServerSearch={isServerSearch}
          serverSearchText={serverSearchText}
          setServerSearchText={setServerSearchText}
          resetPage={serverPaginationParams?.gotoPage}
          isImportExport={isImportExport}
          importExportLoading={importExportLoading}
          btnName={btnName}
          importExportProps={importExportProps}
        />
      )}
      <StyledTable striped={striped} size={size}>
        <Layout.Absolute scrollable>
          <table className={className} {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                      {column.render('Header')}
                      <span className="ml-2">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 320 512"
                              height="0.8em"
                              width="0.8em"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
                            </svg>
                          ) : (
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 320 512"
                              height="0.8em"
                              width="0.8em"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
                            </svg>
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {loading ? (
                <tr className="w-100">
                  {columns.map((item) => (
                    <td key={item.Header}>
                      <TableSkeleton />
                    </td>
                  ))}
                </tr>
              ) : (
                <>
                  {(initPagination ? page : rows).map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} key={i}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td {...cell.getCellProps()} key={index}>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
          {/*used below logic on line 326 */}
          {!loading && !rows.length && (
            <ThemedText className="text-center py-1">No data Available</ThemedText>
          )}
        </Layout.Absolute>
      </StyledTable>
      {/* Pagination */}
      {!loading && initPagination && (
        <PaginationWrapper className="pagination-wrapper">
          <div className="des d-flex align-items-center mr-auto">
            <TableText>Showing</TableText>
            <div className="flex-shrink-1 mx-2">
              <select
                className="form-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  serverPaginationParams?.getRow &&
                    serverPaginationParams.getRow(Number(e.target.value));
                  serverPaginationParams?.gotoPage(0);
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
              <ThemedText className="d-inline">
                {serverPagination && serverPaginationParams
                  ? serverPaginationParams.totalItem
                  : rows.length}
              </ThemedText>{' '}
              results
            </TableText>
          </div>

          <CustomPaginationNumbers
            currentPage={
              serverPagination && serverPaginationParams
                ? serverPaginationParams.currentPage + 1
                : pageIndex + 1
            }
            totalItem={
              serverPagination && serverPaginationParams
                ? serverPaginationParams.totalItem
                : rows.length
            }
            rowPerPage={
              serverPagination && serverPaginationParams
                ? serverPaginationParams.rowPerPage
                : pageSize
            }
            gotoPage={(pageNumber: number) => {
              if (serverPagination && serverPaginationParams) {
                const { gotoPage } = serverPaginationParams;
                gotoPage(pageNumber);
              } else {
                gotoPage(pageNumber);
              }
            }}
            goPrevious={() => {
              if (serverPagination && serverPaginationParams) {
                serverPaginationParams.currentPage > 0 &&
                  serverPaginationParams.gotoPage(serverPaginationParams.currentPage - 1);
              } else {
                canPreviousPage && previousPage();
              }
            }}
            goNext={() => {
              if (serverPagination && serverPaginationParams) {
                const { currentPage, rowPerPage, totalItem, gotoPage } = serverPaginationParams;

                getTotalPage(totalItem, rowPerPage) !== currentPage + 1 &&
                  gotoPage(currentPage + 1);
              } else {
                canNextPage && nextPage();
              }
            }}
          />
        </PaginationWrapper>
      )}
    </TableContainer>
  );
}
