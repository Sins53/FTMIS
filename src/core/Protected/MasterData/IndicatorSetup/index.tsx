import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IndicatorForm from './IndicatorForm';

function IndicatorSetup() {
  const { t } = useTranslation();
  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:table.indicator') + ' ' + t('common:table.setup')}</HeaderTitle>
      </Layout.Header>
      <Box className="flex-grow-1">
        <Layout.Container stretch>
          <Layout.Flex>
            <IndicatorForm />
          </Layout.Flex>
        </Layout.Container>
      </Box>
    </>
  );
}

export default IndicatorSetup;
