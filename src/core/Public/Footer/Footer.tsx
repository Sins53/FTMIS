import { Box, FlexBox, Text } from '@/components/core';
import ContactModal from '@/components/Modal/ContactModal';
import { coolGray } from '@/theme/colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const today = new Date();
  const year = today.getFullYear();

  const [modalContact, setModalContact] = useState(false);
  const toggleContactModal = () => {
    setModalContact(!modalContact);
  };
  return (
    <>
      <FlexBox align="center" justify="space-between">
        <Text variant="display1" color={coolGray[600]}>
          {`©  ${year} ${t('common:buttons.copyright')}`}
        </Text>
        <Box component="ul" className="list list-01">
          <Box component="li">
            <a
              href="#"
              onClick={() => {
                toggleContactModal();
              }}>
              {t('common:buttons.contact_support')}
            </a>
          </Box>
          <Box component="li">
            <Link to="/#"> {t('common:buttons.privacy_policy')}</Link>
          </Box>
          <Box component="li">
            <Link to="/#"> {t('common:buttons.terms')}</Link>
          </Box>
        </Box>
      </FlexBox>

      <ContactModal toggleContactModal={toggleContactModal} modalContact={modalContact} />
    </>
  );
};

export default Footer;
