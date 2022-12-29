import { useDebounce } from '@/hooks';
import React, { useEffect } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap';
import { ImportExportProps, TableImportExport } from './TableComponent';

interface IPropsTableFilter {
  searchKey: string;
  setSearchKey: (data: string) => void;
  isFilter?: boolean;
  isSearch?: boolean;
  isOrdering?: boolean;
  isAddAndRedirectTo?: {
    title: string;
    onClick: () => void;
    btnClass?: string;
  };
  filterButtonClickAction?: () => void;
  TableFilterComponent?: React.ReactNode;
  // for privilege

  /**
   * For Server Side Search
   */
  isServerSearch?: boolean;
  serverSearchText?: string;
  setServerSearchText?: (text: string) => void;
  resetPage?: any;

  // For Import Export
  isImportExport?: boolean;
  btnName?: string;
  importExportLoading?: boolean;
  importExportProps?: ImportExportProps;
}
export type ChildElement = (props: {
  toggle: () => void;
  isFilterOpen: boolean;
}) => React.ReactElement;

function TableFilter(props: IPropsTableFilter) {
  // const [startDate, setStartDate] = React.useState(new Date());
  const {
    searchKey,
    setSearchKey,
    isSearch,
    isOrdering,
    isAddAndRedirectTo,
    isFilter,
    filterButtonClickAction,
    TableFilterComponent,
    isServerSearch,
    serverSearchText,
    setServerSearchText,
    isImportExport,
    btnName,
    importExportLoading = false,
    importExportProps,
    resetPage
  } = props;
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // React.useEffect(() => {
  //   if (searchKey) {
  //     setSearchKey(searchKey);
  //   }
  // }, [searchKey]);
  const initialPage = useDebounce(serverSearchText, 400);

  useEffect(() => {
    initialPage && resetPage(0);
  }, [initialPage]);

  return (
    <div className="w-100 py-3">
      <div className="table-header">
        <div className="align-vertical justify-content-between w-100 ">
          {isOrdering && (
            <div className="align-vertical mr-3">
              <i className="ic-sort-arrow text-gray-80 mr-2"></i>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle tag="div" className="dropdown-text" caret>
                  Sort
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Ascending</DropdownItem>
                  <DropdownItem>Descending</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}

          {isSearch && (
            <div className="form-control-icon rft flex-grow-1 ">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={isServerSearch ? serverSearchText && serverSearchText : searchKey}
                onChange={(e) => {
                  isServerSearch && setServerSearchText
                    ? setServerSearchText(e.target.value)
                    : setSearchKey(e.target.value);
                }}
              />
              <i className="ic-search"></i>
            </div>
          )}

          {filterButtonClickAction && (
            <UncontrolledDropdown onClick={filterButtonClickAction}>
              <DropdownToggle className="btn-filter btn-outline-gray-16 ml-3">
                <i className="ic-filter mr-2"></i> <span> Filter By</span>{' '}
                <i className="ic-arrow-down"></i>
              </DropdownToggle>
            </UncontrolledDropdown>
          )}

          {isFilter && (
            <UncontrolledDropdown>
              <DropdownToggle className="btn-filter btn-outline-gray-16 ml-3">
                <i className="ic-filter mr-2"></i> <span> Filter By</span>{' '}
                <i className="ic-arrow-down"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-filter" end>
                {React.isValidElement(TableFilterComponent)
                  ? TableFilterComponent
                  : React.createElement(TableFilterComponent as ChildElement)}

                {/* {TableFilterComponent && <TableFilterComponent />} */}
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
          {isImportExport && importExportProps && (
            <TableImportExport
              btnName={btnName}
              importExportLoading={importExportLoading}
              handleImportCSV={importExportProps.handleImportCSV}
              handleExportCSV={importExportProps.handleExportCSV}
              handleExportPDF={importExportProps.handleExportPDF}
            />
          )}
          {isAddAndRedirectTo && (
            <button
              className={`btn btn-${isAddAndRedirectTo.btnClass || 'success'} btn-icon lft ml-3`}
              onClick={isAddAndRedirectTo.onClick}>
              <i className="ic-add"></i>
              {isAddAndRedirectTo.title}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableFilter;
