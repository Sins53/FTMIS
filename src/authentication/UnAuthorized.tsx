import { Box, FlexBox, Image, Text } from '@/components/core';
import image from '@/assets/image/401.png';
import Button from '@/components/derived/Buttons/Buttons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function UnAuthorized() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <FlexBox align="center" justify="center" className="h-100 mx-auto">
      <FlexBox align="center">
        <Image src={image} height={'202'} />

        <Box className="ml-5">
          <Text variant="h4" className="fw-bold">
            {t('common:no_data.unauthorized')}
          </Text>
          <Text variant="p" className="mt-3 text-gray-56">
            {t('common:no_data.unauthorized_message')}
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
    </FlexBox>
  );
}
