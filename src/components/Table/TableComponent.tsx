import { useRef, useState } from 'react';
import { BsBoxArrowInUpRight, BsBoxArrowUpRight } from 'react-icons/bs';
import { MoreIcon } from '.';
import { FlexBox } from '../core';
import DeleteModal from '../Modal/DeleteModal';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '../utils';
import LoadingButton from '../LoadingButton/LoadingButton';
import { AiFillFileExcel, AiFillFilePdf } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

interface DisableButtonProps {
  edit?: boolean;
  delete?: boolean;
  config?: boolean;
  view?: boolean;
}
interface ActionProps {
  handleEditClick?: () => void;
  handleConfigurationClick?: () => void;
  handleDeleteClick?: () => void;
  handleViewClick?: () => void;
  disable?: DisableButtonProps;
}
interface DropdownProps {
  handleViewClick?: () => void;
  handleAcquiredClick?: () => void;
  handleDisbursedClick?: () => void;
}
export interface ImportExportProps {
  handleImportCSV?: (file: File) => void;
  handleExportCSV?: () => void;
  handleExportPDF?: () => void;
}

export function TableAction(props: ActionProps) {
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDeleteModal = () => setModalDelete(!modalDelete);
  return (
    <ul className="list table-action">
      {props.handleConfigurationClick && (
        <li>
          {!props?.disable?.config ? (
            <button
              title={'Settings'}
              className="btn btn-sm btn-icon"
              onClick={() => props.handleConfigurationClick && props.handleConfigurationClick()}>
              <i className="ic-settings"></i>
            </button>
          ) : (
            <button title={'Settings'} className="btn btn-sm btn-icon disabled">
              <i className="ic-settings"></i>
            </button>
          )}
        </li>
      )}
      {props.handleViewClick && (
        <li>
          {!props?.disable?.view ? (
            <button
              title={'View'}
              className="btn btn-sm btn-icon"
              onClick={() => props.handleViewClick && props.handleViewClick()}>
              <i className="ic-view"></i>
            </button>
          ) : (
            <button title={'View'} className="btn btn-sm btn-icon disabled">
              <i className="ic-view"></i>
            </button>
          )}
        </li>
      )}

      {props.handleEditClick && (
        <li>
          {!props?.disable?.edit ? (
            <button
              title={'Edit'}
              className="btn btn-sm btn-icon"
              onClick={() => {
                return props.handleEditClick && props.handleEditClick();
              }}>
              <i className="ic-edit"></i>
            </button>
          ) : (
            <button title={'Edit'} className="btn btn-sm btn-icon disabled">
              <i className="ic-edit"></i>
            </button>
          )}
        </li>
      )}

      {props.handleDeleteClick && (
        <>
          <li>
            {!props?.disable?.delete ? (
              <button
                title={'Delete'}
                className="btn btn-sm btn-icon"
                type="button"
                onClick={toggleDeleteModal}>
                <i className="ic-delete"></i>
              </button>
            ) : (
              <button title={'Delete'} className="btn btn-sm btn-icon disabled" type="button">
                <i className="ic-delete"></i>
              </button>
            )}
          </li>

          <DeleteModal
            handleDeleteClick={props.handleDeleteClick}
            toggleDeleteModal={toggleDeleteModal}
            modalDelete={modalDelete}
          />
        </>
      )}
    </ul>
  );
}
export function TableDropdown(props: DropdownProps) {
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);

  const { handleViewClick, handleAcquiredClick, handleDisbursedClick } = props;
  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleDropdown(!dropdownOpen)}>
        <DropdownToggle color="default">
          <MoreIcon className="ic-more-vert"></MoreIcon>
        </DropdownToggle>
        <DropdownMenu>
          {handleViewClick && (
            <DropdownItem
              onClick={() => {
                return handleViewClick && handleViewClick();
              }}>
              <FlexBox align="center">
                <i className="ic-view mr-3" />
                {t('common:actions.view')}
              </FlexBox>
            </DropdownItem>
          )}
          {handleAcquiredClick && (
            <DropdownItem
              onClick={() => {
                return handleAcquiredClick && handleAcquiredClick();
              }}>
              <FlexBox align="center">
                <BsBoxArrowInUpRight className="mr-3" />
                {t('common:buttons.acquired')}
              </FlexBox>
            </DropdownItem>
          )}
          {handleDisbursedClick && (
            <DropdownItem
              onClick={() => {
                return handleDisbursedClick && handleDisbursedClick();
              }}>
              <FlexBox align="center">
                <BsBoxArrowUpRight className="mr-3" />
                {t('common:buttons.disburse')}
              </FlexBox>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

interface ITableImportExport extends ImportExportProps {
  importExportLoading?: boolean;
  btnName?: string;
}

export function TableImportExport(props: ITableImportExport) {
  const { handleImportCSV, handleExportCSV, handleExportPDF, importExportLoading, btnName } = props;

  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);
  const { t } = useTranslation();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleImportCSV && e.target.files) {
      handleImportCSV(e.target.files?.[0]);
    }
  };

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={() => toggleDropdown(!dropdownOpen)}>
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
        <DropdownToggle tag="a">
          <LoadingButton
            className="btn btn-outline-primary btn-icon rft ml-2"
            onClick={() => {
              if (fileRef.current) {
                fileRef.current.value = '';
              }
            }}
            loading={importExportLoading}
            disabled={importExportLoading}>
            {btnName ? btnName : t('common:table.action')}
            <i className="ic-arrow-down"></i>
          </LoadingButton>
        </DropdownToggle>
        <DropdownMenu>
          {handleImportCSV && (
            <DropdownItem onClick={() => fileRef?.current?.click()}>
              <FlexBox align="center">
                <span>
                  <AiFillFileExcel /> {t('common:table.import_csv')}
                </span>
              </FlexBox>
            </DropdownItem>
          )}
          <DropdownItem divider className="m-0" />
          {handleExportCSV && (
            <DropdownItem
              onClick={() => {
                return handleExportCSV && handleExportCSV();
              }}>
              <FlexBox align="center">
                <span>
                  <AiFillFileExcel /> {t('common:table.export_csv')}
                </span>
              </FlexBox>
            </DropdownItem>
          )}
          <DropdownItem divider className="m-0" />
          {handleExportPDF && (
            <DropdownItem
              onClick={() => {
                return handleExportPDF && handleExportPDF();
              }}>
              <FlexBox align="center">
                <span>
                  <AiFillFilePdf /> {t('common:buttons.export_pdf')}
                </span>
              </FlexBox>
            </DropdownItem>
          )}
          <DropdownItem divider className="m-0" />
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
