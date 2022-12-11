import { Box, FlexBox, Image } from '@/components/core';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { publicPath } from '@/routes/public';
import { useNavigate } from 'react-router-dom';
import Public from '../Public';
import { CardBox, CardWrapper, Title } from '../Styles/styles';
import OTPImage from '@/assets/image/opt-success.png';
import { Text } from '@/components/core';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { coolGray } from '@/theme/colors';
import { default as logo } from '@/assets/image/logo.png';

const OTPForm: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Public>
        <CardBox>
          <Box className="text-center  d-block d-md-none">
            <Image src={logo} height="40" className="mb-3" />
          </Box>
          <CardWrapper>
            <Box className="mb-5">
              <FlexBox direction="column" align="center"></FlexBox>
              <Box className="text-center">
                <img src={OTPImage} alt="OTP-Success" width="226px" />
                <Title>Thank You !</Title>
                <Text variant="display1" color={coolGray[800]} className="my-4">
                  {'You Have Successfully Registered.'}
                </Text>
              </Box>
              <Box className="mt-4 text-center">
                <LoadingButton
                  className="btn btn-primary btn-icon rft "
                  onClick={() => navigate(publicPath.login)}>
                  {t('common:form.login')}
                </LoadingButton>
              </Box>
            </Box>
          </CardWrapper>
        </CardBox>
      </Public>
    </>
  );
};

export default OTPForm;
