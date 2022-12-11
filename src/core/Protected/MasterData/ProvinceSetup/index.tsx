import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CommonFiscalSelector from '../../CommonFiscalSelector/CommonFiscalSelector';
import ProvinceTable from './ProvinceTable';

export const StyledYearSelector = styled(Box)`
  min-width: 15rem;
`;

function Province() {
  const { t } = useTranslation();
  const [fiscalYear, setFiscalYear] = useState<string | number>('');

  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:table.province')}</HeaderTitle>
        <CommonFiscalSelector fiscalYear={fiscalYear} setFiscalYear={setFiscalYear} />
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <Layout.Flex>
            <ProvinceTable fiscalYear={fiscalYear} />
          </Layout.Flex>
        </Layout.Container>
      </div>
    </>
  );
}

export default Province;
