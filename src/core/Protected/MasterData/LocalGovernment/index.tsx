import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { useTranslation } from 'react-i18next';
import LocalGovernmentTable from './LocalGovernmentTable';

function LocalGovernment() {
  const { t } = useTranslation();
  return (
    <>
      <Layout.Header>
        <HeaderTitle>
          {t('common:table.local_government') + ' ' + t('common:table.setup')}
        </HeaderTitle>
      </Layout.Header>
      <Box className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <LocalGovernmentTable />
        </Layout.Container>
      </Box>
    </>
  );
}

export default LocalGovernment;
