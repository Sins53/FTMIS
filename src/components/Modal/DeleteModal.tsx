// import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalBody, ModalFooter } from '../utils';

// interface ActionProps {
//   handleDeleteClick?: () => void;

// }
function DeleteModal(props: any) {
  const { toggleDeleteModal, handleDeleteClick, modalDelete } = props;
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={modalDelete}
      toggle={toggleDeleteModal}
      className="modal-confirm danger"
      centered={true}>
      {/* <ModalHeader toggle={toggleDeleteModal}>Modal title</ModalHeader> */}
      <div className="modal-header">
        <div className="icon">
          <h4 className="ic-delete"></h4>
        </div>
      </div>
      <ModalBody>{t('common:header.sure_to_delete')}</ModalBody>
      <ModalFooter>
        <button
          className="btn btn-outline-gray-16 flex-grow-1"
          type="button"
          onClick={toggleDeleteModal}>
          {t('common:buttons.cancel')}
        </button>
        <button
          className="btn btn-danger flex-grow-1"
          type="button"
          onClick={() => {
            handleDeleteClick && handleDeleteClick();
            toggleDeleteModal();
          }}>
          {t('common:buttons.delete')}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteModal;
