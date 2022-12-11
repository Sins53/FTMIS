import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import { TabContent, TabHeader, TabPane } from '@/components/Tab';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Contact from './Contact';
import Logo from './Logo';
import { useSiteSettingData } from './siteSettingQueries';

const SiteSetting = () => {
  const { t } = useTranslation();
  const headerTab = [
    { headerName: t('common:tabs.logo'), tab: 'logo', component: Logo },
    { headerName: t('common:tabs.contact'), tab: 'contacts', component: Contact }
  ];
  const [activeTab, setActiveTab] = useState(headerTab[0].tab);
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };
  const { data: siteSettingData, isFetched } = useSiteSettingData({ category: activeTab });

  return (
    <Layout.Flex>
      <Layout.Header className="w-100">
        <HeaderTitle>{t('common:header.site_setting')} </HeaderTitle>
      </Layout.Header>
      <Layout.Header tab={true} secondary={true} sticky className="w-100">
        <TabHeader
          className="tab-01 w-100 "
          headerTab={headerTab}
          toggle={toggleTab}
          activeTab={activeTab}
        />
      </Layout.Header>
      <Box className="flex-grow-1 position-relative w-100">
        <Layout.Absolute scrollable>
          <TabContent activeTab={activeTab} className="h-100 w-100">
            {headerTab.map((tabItem, index) => {
              const { component: Component } = tabItem;
              return (
                tabItem.tab === activeTab && (
                  <TabPane key={index} tabId={tabItem.tab} className="h-100">
                    <Layout.Container stretch>
                      {isFetched && siteSettingData && (
                        <>
                          <Layout.Flex className="h-100">
                            <Component data={siteSettingData} />
                          </Layout.Flex>
                        </>
                      )}
                    </Layout.Container>
                  </TabPane>
                )
              );
            })}
          </TabContent>
        </Layout.Absolute>
      </Box>
    </Layout.Flex>
  );
};

export default SiteSetting;
