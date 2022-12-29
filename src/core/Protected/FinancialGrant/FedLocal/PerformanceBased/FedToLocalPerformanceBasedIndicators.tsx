import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import React, { useState } from 'react';
import { useIndicatorData } from '../../PerformanceBased/PerformanceBasedQueries';
import { Nav } from '@/components/Tab/TabHeader/tab-styles';
import { TabContent, TabPane } from '@/components/Tab';
import BudgetPresentation from './Indicators/BudgetPresentation/BudgetPresentation';
import RevenueCollectionProgress from './Indicators/RevenueCollectionProgress/RevenueCollectionProgress';
import DeleteThis from './Indicators/DeleteThis/DeleteThis';
import RevenueCollectionRatio from './Indicators/RevenueCollectionRatio/RevenueCollectionRatio';
import TotalExpenseRatio from './Indicators/TotalExpenseRatio/TotalExpenseRatio';
import CapitalExpenseRatio from './Indicators/CapitalExpenseRatio/CapitalExpenseRatio';
import Beruju from './Indicators/Beruju/Beruju';
import SutraPortal from './Indicators/SutraPortal/SutraPortal';
import PeriodicPlan from './Indicators/PeriodicPlan/PeriodicPlan';
import NetAdmissionRate from './Indicators/NetAdmissionRate/NetAdmissionRate';

const FedToLocalPerformanceBasedIndicators = () => {
  const [activeTab, setActiveTab] = useState<string>('indicator36');
  const toggleTab = (tab: string) => [setActiveTab(tab)];
  const { data: indicatorData } = useIndicatorData({
    grant: 'performance',
    module: 'gov_localbody'
  });

  const headerTab = [
    { tab: 'indicator36', component: DeleteThis },
    { tab: 'indicator37', component: DeleteThis },
    { tab: 'indicator38', component: RevenueCollectionRatio },
    { tab: 'indicator40', component: TotalExpenseRatio },
    { tab: 'indicator41', component: CapitalExpenseRatio },
    { tab: 'indicator42', component: Beruju },
    { tab: 'indicator39', component: RevenueCollectionProgress },
    { tab: 'indicator23', component: SutraPortal },
    { tab: 'indicator24', component: BudgetPresentation },
    { tab: 'indicator25', component: DeleteThis },
    { tab: 'indicator26', component: DeleteThis },
    { tab: 'indicator27', component: DeleteThis },
    { tab: 'indicator28', component: DeleteThis },
    { tab: 'indicator30', component: PeriodicPlan },
    { tab: 'indicator31', component: NetAdmissionRate },
    { tab: 'indicator32', component: DeleteThis },
    { tab: 'indicator33', component: DeleteThis },
    { tab: 'indicator34', component: DeleteThis },
    { tab: 'indicator35', component: DeleteThis }
  ];
  console.log(activeTab, 'qwe');
  return (
    <Layout.Main>
      <Layout.Header backToList>
        <HeaderTitle variant="h5" typeface="semiBold">
          Performance Based Indicators
        </HeaderTitle>
      </Layout.Header>
      <Box className="flex-grow-1 ">
        <Nav tabs className="activity-log h-100">
          <div className="activity-log-tabs">
            <ul className="position-relative h-100">
              <Layout.Absolute scrollable>
                {indicatorData?.map((indicator) => (
                  <li
                    key={indicator.code}
                    className={activeTab == indicator.code ? 'active' : ''}
                    onClick={() => {
                      toggleTab(indicator.code);
                    }}>
                    {indicator.name}
                  </li>
                ))}
              </Layout.Absolute>
            </ul>
          </div>
          <TabContent className="h-100" activeTab={activeTab}>
            {headerTab.map((tabItem, index) => {
              const { component: Component } = tabItem;
              return (
                tabItem.tab === activeTab && (
                  <TabPane key={index} tabId={tabItem.tab} className="h-100">
                    {<Component />}
                  </TabPane>
                )
              );
            })}
          </TabContent>
        </Nav>
      </Box>
    </Layout.Main>
  );
};

export default FedToLocalPerformanceBasedIndicators;