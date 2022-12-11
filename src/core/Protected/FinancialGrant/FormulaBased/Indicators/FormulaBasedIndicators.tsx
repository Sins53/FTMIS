import { Box } from '@/components/core';
import { HeaderTitle } from '@/components/Header/Header';
import Layout from '@/components/layout';
import React, { useState } from 'react';
import { useIndicatorData } from '../../PerformanceBased/PerformanceBasedQueries';
import { Nav } from '@/components/Tab/TabHeader/tab-styles';
import { TabContent, TabPane } from '@/components/Tab';
import HDI from './HDI/HDI';
import MDI from './MDI/MDI';
import { useProvinceData } from '@/core/Protected/MasterData/Location/locationQueries';
import ItAccess from './ItAccess/ItAccess';
import RevenueCondition from './RevenueCondition/RevenueCondition';
import DrinkingWater from './DrinkingWater/DrinkingWater';
import ElectricityAccess from './ElectricityAccess/ElectricityAccess';
import Toilet from './Toilet/Toilet';
import RoadDensity from './RoadDensity/RoadDensity';
import FiscalGap from './FiscalGap/FiscalGap';

const FormulaBasedIndicators = () => {
  const [activeTab, setActiveTab] = useState<number>(14);
  const toggleTab = (tab: number) => [setActiveTab(tab)];
  const { data: indicatorData } = useIndicatorData({ grant: 'formula' });
  const { data: provinceData } = useProvinceData({});

  const headerTab = [
    { tab: 14, component: HDI },
    { tab: 15, component: MDI },
    { tab: 17, component: RoadDensity },
    { tab: 18, component: ElectricityAccess },
    { tab: 19, component: ItAccess },
    { tab: 20, component: DrinkingWater },
    { tab: 21, component: Toilet },
    { tab: 22, component: RevenueCondition },
    { tab: 23, component: FiscalGap }
  ];
  return (
    <Layout.Main>
      <Layout.Header backToList>
        <HeaderTitle variant="h5" typeface="semiBold">
          Formula Based Indicators
        </HeaderTitle>
      </Layout.Header>
      <Box className="flex-grow-1 ">
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
                    {provinceData && <Component provinceData={provinceData.records} />}
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

export default FormulaBasedIndicators;
