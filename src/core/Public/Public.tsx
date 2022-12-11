import { Box, Button, FlexBox, Image, Text } from '@/components/core';

import BgImg from '@/assets/image/bg-login.png';
import BgRightImg from '@/assets/image/bgRightImg.svg';
import { default as LogoImg } from '@/assets/image/logo.png';
import { publicPath } from '@/routes/public';
import { base } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { BsChevronLeft } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HeaderWrapper,
  InnerWrapper,
  LanguageBox,
  LeftContent,
  LeftImageWrapper,
  OuterWrapper,
  PublicNav,
  RightImageWrapper
} from '../Public/Styles/styles';
import LanguageToggle from './Welcome/LanguageToggle';
import { useState } from 'react';
import ContactModal from '@/components/Modal/ContactModal';

const Public = ({ children }: { children: React.ReactNode | React.ReactNode[] }): JSX.Element => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();

  const [modalContact, setModalContact] = useState(false);
  const toggleContactModal = () => {
    setModalContact(!modalContact);
  };

  return (
    <>
      <OuterWrapper>
        <Box className="row g-0">
          <Box className="col-md-8">
            <InnerWrapper>
              <HeaderWrapper>
                <FlexBox align="center" justify="space-between">
                  <FlexBox align="center" className="flex-shrink-0">
                    <BsChevronLeft color={base.white} />
                    <Button
                      className="btn btn-outline-light mx-3"
                      onClick={() => navigate(publicPath.welcome)}>
                      {t('common:buttons.go_back')}
                    </Button>
                  </FlexBox>
                </FlexBox>
                <FlexBox align="center" justify="flex-end" className="flex-grow-1 d-flex d-md-none">
                  {location.pathname !== publicPath.login && (
                    <Button
                      className="btn btn-outline-light mx-3"
                      onClick={() => navigate(publicPath.login)}>
                      {t('common:form.login')}
                    </Button>
                  )}
                  <LanguageBox>
                    <LanguageToggle status={true} />
                  </LanguageBox>
                </FlexBox>
              </HeaderWrapper>

              <LeftContent>
                <Image src={LogoImg} height="58" />
              </LeftContent>
              <LeftImageWrapper>
                <Image src={BgImg} width="100%" height="100%" />
              </LeftImageWrapper>
              <PublicNav align="center" justify="space-between">
                <Box>
                  <Text variant="display2" color={base.white}>
                    {`©  ${year} ${t('common:buttons.copyright')}`}
                  </Text>
                </Box>
                <Box className="d-flex mx-4">
                  <Button
                    className="btn p-0"
                    onClick={() => {
                      toggleContactModal();
                    }}>
                    <Text variant="display2" color={base.white}>
                      {t('common:buttons.contact_support')}
                    </Text>
                  </Button>
                  <Button className="btn p-0">
                    <Text variant="display2" color={base.white} className="mx-4">
                      {t('common:buttons.privacy_policy')}
                    </Text>
                  </Button>
                  <Button className="btn p-0">
                    <Text variant="display2" color={base.white}>
                      {t('common:buttons.terms')}
                    </Text>
                  </Button>
                </Box>
              </PublicNav>
            </InnerWrapper>
          </Box>

          <Box className="col-md-4 d-none d-md-block ">
            <RightImageWrapper>
              <FlexBox align="center">
                <Box>
                  {location.pathname !== publicPath.login && (
                    <Button
                      className="btn btn-outline-primary mx-3"
                      onClick={() => navigate(publicPath.login)}>
                      {t('common:form.login')}
                    </Button>
                  )}
                </Box>
                <LanguageBox>
                  <LanguageToggle />
                </LanguageBox>
              </FlexBox>

              <Image src={BgRightImg}></Image>
            </RightImageWrapper>
          </Box>
        </Box>
        {children}
      </OuterWrapper>
      <ContactModal toggleContactModal={toggleContactModal} modalContact={modalContact} />
    </>
  );
};
export default Public;
