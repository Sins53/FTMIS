// import React, { useState } from 'react';
import { coolGray, green } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { BsCheck } from 'react-icons/bs';
import styled from 'styled-components';
import { Box, FlexBox, Text } from '../core';
import { Modal, ModalBody, ModalFooter } from '../utils';

interface ModalProps {
  handleSuccessClick?: () => void;
  toggleSuccessModal: () => void;
  modalSuccess: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
}

const IconWrapper = styled(Box)`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${green[100]};
`;

function SuccessModal(props: ModalProps) {
  const { toggleSuccessModal, handleSuccessClick, modalSuccess, title, message, buttonText } =
    props;
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={modalSuccess}
      toggle={toggleSuccessModal}
      centered={true}
      backdrop="static"
      keyboard={false}>
      <ModalBody className="px-4 py-5">
        <FlexBox>
          <IconWrapper>
            <BsCheck className="h4" color={green[900]} />
          </IconWrapper>
          <Box className="flex-grow-1 ml-4">
            <Text variant="h5" typeface="semiBold" color={coolGray[800]} className="mb-2">
              {title ? title : t('common:header.application_success')}
            </Text>
            <Text variant="display1" color={coolGray[700]}>
              {message ? message : t('common:header.congratulation')}
            </Text>
          </Box>
        </FlexBox>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            handleSuccessClick && handleSuccessClick();
            toggleSuccessModal();
          }}>
          {buttonText ? buttonText : t('common:buttons.continue')}
        </button>
      </ModalFooter>
    </Modal>
  );
}

export default SuccessModal;
