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
import StudentConsistencyRate from './Indicators/StudentConsistencyRate/StudentConsistencyRate';
import SeePerformance from './Indicators/SeePerformance/SeePerformance';
import PregnancyTest from './Indicators/PregnancyTest/PregnancyTest';
import ReportOnlinePortal from './Indicators/ReportOnlinePortal/ReportOnlinePortal';
import HealthInstitute from './Indicators/HealthInstitute/HealthInstitute';
import CompleteVaccination from './Indicators/CompleteVaccination/CompleteVaccination';
import BudgetApproval from './Indicators/BudgetApproval/BudgetApproval';
import TaxDistribution from './Indicators/TaxDistribution/TaxDistribution';
import ReportingToMof from './Indicators/ReportingToMof/ReportingToMof';

const FedToLocalPerformanceBasedIndicators = () => {
  const [activeTab, setActiveTab] = useState<string>('indicator30');
  const toggleTab = (tab: string) => [setActiveTab(tab)];
  const { data: indicatorData } = useIndicatorData({
    grant: 'performance',
    module: 'gov_localbody'
  });

  const headerTab = [
    { tab: 'indicator36', component: CompleteVaccination },
    { tab: 'indicator37', component: ReportOnlinePortal },
    { tab: 'indicator38', component: RevenueCollectionRatio },
    { tab: 'indicator40', component: TotalExpenseRatio },
    { tab: 'indicator41', component: CapitalExpenseRatio },
    { tab: 'indicator42', component: Beruju },
    { tab: 'indicator39', component: RevenueCollectionProgress },
    { tab: 'indicator23', component: SutraPortal },
    { tab: 'indicator24', component: BudgetPresentation },
    { tab: 'indicator25', component: BudgetApproval },
    { tab: 'indicator26', component: TaxDistribution },
    { tab: 'indicator27', component: ReportingToMof },
    { tab: 'indicator28', component: DeleteThis },
    { tab: 'indicator30', component: PeriodicPlan },
    { tab: 'indicator31', component: NetAdmissionRate },
    { tab: 'indicator32', component: StudentConsistencyRate },
    { tab: 'indicator33', component: SeePerformance },
    { tab: 'indicator34', component: PregnancyTest },
    { tab: 'indicator35', component: HealthInstitute }
  ];
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
