import Layout from '@/components/layout';
import { TabContent, TabPane } from '@/components/Tab';
import { Nav } from '@/components/Tab/TabHeader/tab-styles';
import React, { useState } from 'react';
import AirQualityIndex from './AirQualityIndex/AirQualityIndex';
import Beruju from './Beruju/Beruju';
import BudgetReview from './BudgetReview/BudgetReview';
import CapitalExpenseRatio from './CapitalExpenseRatio/CapitalExpenseRatio';
import Compliance from './Compliance/Compliance';
import EqualizationGrantToLg from './EqualizationGrantToLg/EqualizationGrantToLg';
import IncreaseForestArea from './IncreaseForestArea/IncreaseForestArea';
import { useIndicatorData } from './PerformanceBasedQueries';
import ReportingToMof from './ReportingToMof/ReportingToMof';
import ReportOnlinePortal from './ReportOnlinePortal/ReportOnlinePortal';
import RevenueCollectionProgress from './RevenueCollectionProgress/RevenueCollectionProgress';
import RevenueCollectionRatio from './RevenueCollectionRatio/RevenueCollectionRatio';
import TotalExpenseRatio from './TotalExpenseRatio/TotalExpenseRatio';
import VehicleTax from './VehicleTax/VehicleTax';

function PerformanceIndicators() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const toggleTab = (tab: number) => [setActiveTab(tab)];
  const { data: indicatorData } = useIndicatorData({ grant: 'performance' });

  const headerTab = [
    { tab: 1, component: Beruju },
    { tab: 2, component: Compliance },
    { tab: 3, component: VehicleTax },
    { tab: 4, component: TotalExpenseRatio },
    { tab: 5, component: CapitalExpenseRatio },
    { tab: 6, component: RevenueCollectionRatio },
    { tab: 7, component: RevenueCollectionProgress },
    { tab: 8, component: EqualizationGrantToLg },
    { tab: 9, component: ReportingToMof },
    { tab: 10, component: BudgetReview },
    { tab: 11, component: AirQualityIndex },
    { tab: 12, component: IncreaseForestArea },
    { tab: 13, component: ReportOnlinePortal }
  ];

  return (
    <>
      <Nav tabs className="activity-log h-100">
        <div className="activity-log-tabs">
          <ul className="position-relative h-100">
            <Layout.Absolute scrollable>
              {indicatorData?.map((indicator) => (
                <li
                  key={indicator.id}
                  className={activeTab == indicator.id ? 'active' : ''}
                  onClick={() => {
                    toggleTab(indicator.id);
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
        {/* <TabContent className="h-100" activeTab={activeTab}>
          {activeTab === 1 && (
            <TabPane tabId={1} className="h-100">
              <Beruju />
            </TabPane>
          )}
          {activeTab === 2 && (
            <TabPane tabId={2} className="h-100">
              <Compliance />
            </TabPane>
          )}
          {activeTab === 3 && (
            <TabPane tabId={3} className="h-100">
              <VehicleTax />
            </TabPane>
          )}
          {activeTab === 4 && (
            <TabPane tabId={4} className="h-100">
              <TotalExpenseRatio />
            </TabPane>
          )}
          {activeTab === 5 && (
            <TabPane tabId={5} className="h-100">
              <CapitalExpenseRatio />
            </TabPane>
          )}
          {activeTab === 6 && (
            <TabPane tabId={6} className="h-100">
              <RevenueCollectionRatio />
            </TabPane>
          )}
          {activeTab === 7 && (
            <TabPane tabId={7} className="h-100">
              <RevenueCollectionProgress />
            </TabPane>
          )}
          {activeTab === 8 && (
            <TabPane tabId={8} className="h-100">
              <EqualizationGrantToLg />
            </TabPane>
          )}
          {activeTab === 9 && (
            <TabPane tabId={9} className="h-100">
              <ReportingToMof />
            </TabPane>
          )}
          {activeTab === 10 && (
            <TabPane tabId={10} className="h-100">
              <BudgetReview />
            </TabPane>
          )}
          {activeTab === 11 && (
            <TabPane tabId={11} className="h-100">
              <AirQualityIndex />
            </TabPane>
          )}
          {activeTab === 12 && (
            <TabPane tabId={12} className="h-100">
              <IncreaseForestArea />
            </TabPane>
          )}
          {activeTab === 13 && (
            <TabPane tabId={13} className="h-100">
              <ReportOnlinePortal />
            </TabPane>
          )}
        </TabContent> */}
      </Nav>
    </>
  );
}

export default PerformanceIndicators;
