import { useTranslation } from 'react-i18next';
import { Text } from '../core';
import { Modal, ModalBody, ModalFooter } from '../utils';

interface ActionProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  handleModalAction?: () => void;
  confirmationMessage?: string;
  actionButtonName?: string;
  cancelButtonName?: string;
}

function ConfirmationModal(props: ActionProps) {
  const {
    toggleModal,
    handleModalAction,
    isModalOpen,
    confirmationMessage,
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
      <div className="modal-header" style={{ color: 'green' }}>
        <div className="icon">
          <h4 className="ic-question"></h4>
        </div>
      </div>
      <ModalBody>
        <Text typeface="regular">
          {confirmationMessage ? confirmationMessage : t('common:header.modal_confirm')}
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

export default ConfirmationModal;
