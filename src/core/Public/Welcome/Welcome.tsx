import { default as logo } from '@/assets/image/logo.png';
import { Box, FlexBox, Image, Text } from '@/components/core';
import Button from '@/components/derived/Buttons/Buttons';
import Layout from '@/components/layout';
import { publicPath } from '@/routes/public';
import { coolGray } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { OuterWrapper } from '../Styles/styles';
import LanguageToggle from './LanguageToggle';

export interface ILoanType {
  loanType: string;
  checked: number;
}
export default function Welcome() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <OuterWrapper>
      <Box className="container h-100 py-6">
        <Layout.Flex className="h-100">
          <FlexBox align="center" justify="space-between" className="w-100 px-4 px-md-0">
            <Box>
              <Image src={logo} height="48"></Image>
            </Box>
            <FlexBox align="center">
              <Button
                className="btn btn-outline-primary mr-3"
                onClick={() => navigate(publicPath.login)}>
                {t('common:form.login')}
              </Button>

              <LanguageToggle />
            </FlexBox>
          </FlexBox>

          <Box className="flex-grow-1 position-relative w-100">
            <Layout.Absolute scrollable className="px-3">
              <Box className="row h-100 align-items-center">
                <Box className="col-lg-7 mx-auto">
                  <Box className="text-center">
                    <Text variant="h2" color={coolGray[800]} typeface="semiBold" className="mb-2">
                      {t('welcome:title')}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Layout.Absolute>
          </Box>
        </Layout.Flex>
      </Box>
    </OuterWrapper>
  );
}
