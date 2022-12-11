import { useTranslation } from 'react-i18next';
import { Text } from '../core';
import { Modal, ModalBody, ModalFooter } from '../utils';

interface ActionProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  handleModalAction?: () => void;
  errorMessage?: string;
  actionButtonName?: string;
  cancelButtonName?: string;
}

function ErrroModal(props: ActionProps) {
  const {
    toggleModal,
    handleModalAction,
    isModalOpen,
    errorMessage,
    actionButtonName,
    cancelButtonName
  } = props;
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isModalOpen}
      toggle={toggleModal}
      className="modal-confirm danger"
      centered={true}>
      <div className="modal-header">
        <div className="icon">
          <h4 className="ic-error"></h4>
        </div>
      </div>
      <ModalBody>
        <Text typeface="regular">
          {errorMessage ? errorMessage : t('common:header.modal_error')}
        </Text>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-outline-gray-16 flex-grow-1" type="button" onClick={toggleModal}>
          {cancelButtonName ? cancelButtonName : t('common:buttons.cancel')}
        </button>
        <button
          className="btn btn-danger flex-grow-1"
          type="button"
          onClick={() => {
            handleModalAction && handleModalAction();
            toggleModal();
          }}>
          {actionButtonName ? actionButtonName : t('common:buttons.ok')}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default ErrroModal;
