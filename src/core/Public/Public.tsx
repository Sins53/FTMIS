import { Box, FlexBox, Image, Text } from '@/components/core';

import { default as LogoImg } from '@/assets/image/logo-white.svg';
import { base } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import {
  InnerWrapper,
  LanguageBox,
  LeftContent,
  LeftImageWrapper,
  OuterWrapper,
  PublicNav,
  RightImageWrapper
} from '../Public/Styles/styles';
import LanguageToggle from './Welcome/LanguageToggle';

const Public = ({ children }: { children: React.ReactNode | React.ReactNode[] }): JSX.Element => {
  const { t } = useTranslation();

  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      <OuterWrapper>
        <Box className="row g-0">
          <Box className="col-md-8">
            <InnerWrapper>
              <LeftContent>
                <Image src={LogoImg} height="100" />
              </LeftContent>
              <LeftImageWrapper></LeftImageWrapper>
              <PublicNav align="center" justify="space-between">
                <Box>
                  <Text variant="display2" color={base.white}>
                    {`©  ${year} ${t('common:buttons.copyright')}`}
                  </Text>
                </Box>
              </PublicNav>
            </InnerWrapper>
          </Box>

          <Box className="col-md-4 d-none d-md-block ">
            <RightImageWrapper>
              <FlexBox align="center">
                <LanguageBox>
                  <LanguageToggle />
                </LanguageBox>
              </FlexBox>
            </RightImageWrapper>
          </Box>
        </Box>
        {children}
      </OuterWrapper>
    </>
  );
};
export default Public;
