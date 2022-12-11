//import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { TabContent, TabHeader, TabPane } from '@/components/Tab';
import { coolGray } from '@/theme/colors';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FirmTable from './FirmTable';
import IndividualTable from './IndividualTable';

function CustomerList() {
  const { t } = useTranslation();
  const headerTab = [
    { headerName: t('common:tabs.individual'), tab: 'individualList' },
    { headerName: t('common:tabs.institutional'), tab: 'firmList' }
  ];
  const [activeTab, setActiveTab] = useState('individualList');
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Layout.Header>
        <HeaderTitle variant="h5" typeface="semiBold" color={coolGray[700]}>
          {t('common:header.customer_profile_detail')}
        </HeaderTitle>
      </Layout.Header>
      <Layout.Header secondary={true} tab={true}>
        <TabHeader
          className="tab-01 w-100 "
          headerTab={headerTab}
          toggle={toggleTab}
          activeTab={activeTab}
        />
      </Layout.Header>
      <Layout.Container stretch>
        <TabContent activeTab={activeTab} className="app-height w-100">
          {activeTab === 'individualList' && (
            <TabPane tabId="individualList" className="h-100">
              <IndividualTable />
            </TabPane>
          )}
          {activeTab === 'firmList' && (
            <TabPane tabId="firmList" className="h-100">
              <FirmTable />
            </TabPane>
          )}
        </TabContent>
      </Layout.Container>
    </>
  );
}

export default CustomerList;
