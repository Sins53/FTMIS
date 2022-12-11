import { Box, FlexBox, Image, Text } from '@/components/core';
import Frame from '@/assets/image/Frame.png';
import Button from '@/components/derived/Buttons/Buttons';
// import { useNavigate } from 'react-router-dom';
import { coolGray } from '@/theme/colors';
import Layout from '@/components/layout';
import { default as logo } from '@/assets/image/logo.png';
import LanguageToggle from '@/core/Public/Welcome/LanguageToggle';
import { useTranslation } from 'react-i18next';
import useAuth from '@/hooks/useAuth';
import { getTextByLanguage } from '@/i18n/i18n';

export default function ErrorPage() {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <Layout.Main>
      <FlexBox justify="space-around" className="mt-5">
        <Image src={logo} height="50"></Image>
        <FlexBox align="center">
          <Button className="btn btn-outline-primary mr-2" onClick={() => logout()}>
            {t('common:logout')}
          </Button>
          <LanguageToggle />
        </FlexBox>
      </FlexBox>

      <FlexBox align="center" justify="center" className="flex-grow-1">
        <Box className="row">
          <Box className="col-lg-9 mx-auto">
            <FlexBox align="center" justify="center" className="w-00">
              <Image src={Frame} height={'354'} />
              <Box className="ml-5 ">
                <Text variant="h1" className="fw-bold" color={coolGray[800]}>
                  {getTextByLanguage('500', '५००')}
                </Text>
                <Text variant="h5" className="fw-bold mt-4" color={coolGray[800]}>
                  {getTextByLanguage(
                    'Sorry, It’s not you. It’s us',
                    'माफ गर्नुहोस्, यो तपाईं होइन। यो हाम्रो गल्ति हो'
                  )}
                </Text>
                <Text variant="p" className="mt-3 text-gray-56">
                  {getTextByLanguage(
                    'We’re experencing an internal server problem. Please try again later.',
                    'हाम्रो आन्तरिक सर्भर समस्या भैरहेको छ। फेरी प्रयास गर्नु होला।'
                  )}
                </Text>
                <Button
                  className="btn btn-primary mt-4"
                  onClick={() => {
                    window.location.reload();
                  }}>
                  {t('common:no_data.go_home')}
                </Button>
              </Box>
            </FlexBox>
          </Box>
        </Box>
      </FlexBox>
    </Layout.Main>
  );
}
