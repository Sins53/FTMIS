import { Box, FlexBox, Image, Text } from '@/components/core';
import image from '@/assets/image/404.png';
import Button from '@/components/derived/Buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTextByLanguage } from '@/i18n/i18n';

export default function PageNotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <FlexBox align="center" justify="center" className="w-100 h-100 mx-auto">
      <Box className="row">
        <Box className="col-lg-9 mx-auto">
          <FlexBox align="center" justify="center" className="w-00">
            <Image src={image} height={'220'} />

            <Box className="ml-4">
              <h1 className="fw-bold" style={{ fontSize: '7.5rem' }}>
                {getTextByLanguage('404', '४०४')}
              </h1>
              <Text variant="h5" className="fw-bold mt-4">
                {t('common:no_data.lost')}
              </Text>
              <Text variant="p" className="mt-3 text-gray-56">
                {t('common:no_data.lost_message')}
              </Text>
              <Button
                className="btn btn-primary mt-4"
                onClick={() => {
                  navigate('/');
                }}>
                {t('common:no_data.go_home')}
              </Button>
            </Box>
          </FlexBox>
        </Box>
      </Box>
    </FlexBox>
  );
}
