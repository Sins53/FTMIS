import styled from 'styled-components';
import { Box, Text } from '../core';
import { FiAlertTriangle } from 'react-icons/fi';
import { blue } from '@/theme/colors';
import { useTranslation } from 'react-i18next';

const StyledInformationBox = styled(Box)`
  padding: 1rem;
  border: 1px solid #42a5f5;
  border-radius: 4px;
  background: #e3f2fd;
  margin-bottom: 1rem;
`;

interface InformationProps {
  fileSize: string | number;
}

const ModalInformation = ({ fileSize }: InformationProps) => {
  const { t } = useTranslation();
  return (
    <StyledInformationBox>
      <Box className="row">
        <Box className="col-1">
          <FiAlertTriangle size={24} color=" #1E88E5" />
        </Box>
        <Box className="col-11">
          <Text variant="display1" color={blue[900]} typeface="semiBold">
            {t('common:header.file_format_pdf')}
          </Text>
          <Text variant="display1" color={blue[900]}>
            {t('common:header.maximum_size')} {fileSize}MB
          </Text>
        </Box>
      </Box>
    </StyledInformationBox>
  );
};

export default ModalInformation;
