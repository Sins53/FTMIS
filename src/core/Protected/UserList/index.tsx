import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { TabContent, TabHeader, TabPane } from '@/components/Tab';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CustomerList from './CustomerList';
import InternalUserTable from './InternalUserTable';

function UserList() {
  // const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const headerTab = [
    { headerName: 'Customer', tab: 'customerList' },
    { headerName: 'Internal User', tab: 'internalUserList' }
  ];

  const deepLinkType = searchParams.get('type');

  const defaultTabState = () => {
    return deepLinkType
      ? headerTab.filter((tabItem) => tabItem.tab === deepLinkType).length > 0
        ? deepLinkType
        : headerTab[0].tab
      : headerTab[0].tab;
  };
  const [activeTab, setActiveTab] = useState(defaultTabState);

  const toggleTab = (tab: string) => {
    setSearchParams({ type: tab });
    setActiveTab(tab);
  };

  return (
    <>
      <Layout.Header>
        <HeaderTitle>{t('common:header.customer_internal')}</HeaderTitle>
      </Layout.Header>
      <div className="flex-grow-1 my-3">
        <Layout.Container stretch>
          <TabHeader
            className="tab-01 w-100 "
            headerTab={headerTab}
            toggle={toggleTab}
            activeTab={activeTab}
          />
          <TabContent activeTab={activeTab} className="app-height w-100">
            <TabPane tabId="customerList" className="h-100">
              <CustomerList />
            </TabPane>
            <TabPane tabId="internalUserList" className="h-100">
              <InternalUserTable />
            </TabPane>
          </TabContent>
        </Layout.Container>
      </div>
    </>
  );
}

export default UserList;
