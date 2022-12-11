import { base, coolGray } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Box, FlexBox, Text } from '../core';
import Button from '../derived/Buttons/Buttons';
import { Modal } from '../utils';

interface ModalProps {
  toggleContactModal: () => void;
  modalContact: boolean;
}

const StyledContactBox = styled(Box)`
  background-color: #f0f0f0;
  padding: 1rem 1.5rem;
`;

function ContactModal(props: ModalProps) {
  const { toggleContactModal, modalContact } = props;
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={modalContact}
      toggle={toggleContactModal}
      centered={true}
      backdrop="static"
      keyboard={false}>
      <FlexBox className="w-100 px-4 py-3" align="center" justify="space-between">
        <Text color={coolGray[800]} typeface="semiBold">
          {t('common:header.contact_information')}
        </Text>
        <Button className="btn p-0" onClick={() => toggleContactModal()}>
          <i className="ic-close"></i>
        </Button>
      </FlexBox>
      <>
        <StyledContactBox>
          <FlexBox>
            <Text variant="display1" color={coolGray[700]}>
              {t('common:header.email')}
            </Text>
            <Text className="ml-2" variant="display1" typeface="semiBold" color={coolGray[800]}>
              info@nnrfc.gov.np
            </Text>
          </FlexBox>
          <FlexBox className="mt-3">
            <Text variant="display1" color={coolGray[700]}>
              {t('common:header.address')}
            </Text>
            <Text className="ml-2" variant="display1" typeface="semiBold" color={coolGray[800]}>
              {t('common:header.nnrfc_location')}
            </Text>
          </FlexBox>
        </StyledContactBox>
        <Box className="mt-3 px-3">
          <Text variant="display1" typeface="semiBold" color={base.primary}>
            {t('common:header.phone_numbers')}
          </Text>
          <Box className="row mt-3">
            <Box className="col-6 mb-3">
              <Text variant="display2" color={coolGray[700]}>
                {t('common:header.telephone')}
              </Text>
              <Text variant="display1" typeface="semiBold" color={coolGray[800]}>
                {t('common:header.nnrfc_number')}
              </Text>
            </Box>
          </Box>
        </Box>
      </>
    </Modal>
  );
}

export default ContactModal;
