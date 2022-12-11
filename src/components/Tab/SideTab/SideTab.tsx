import React from 'react';
import classNames from 'classnames';
import { NavLink } from './sidetab-styles';
import { Box } from '@/components/core';

interface HeaderTabObject {
  headerName: string;
  tab: string;
  className?: string;
  icon?: React.ReactElement;
}
interface SideTabProps {
  headerTab: Array<HeaderTabObject>;
  toggle: (tab: string) => void;
  activeTab?: string;
  className?: string;
}

function SideTab(props: SideTabProps) {
  const { headerTab, toggle, activeTab, className } = props;

  return activeTab ? (
    <Box className={classNames(className)}>
      {headerTab.length &&
        headerTab.map((data: HeaderTabObject, index: number) => (
          <Box key={index}>
            <NavLink
              className={classNames({ active: activeTab === data.tab })}
              onClick={() => {
                toggle(data.tab);
              }}>
              <Box>
                {data.icon && (
                  <Box component="span" className="mr-2">
                    {data.icon}
                  </Box>
                )}
                {data.headerName}
              </Box>
            </NavLink>
          </Box>
        ))}
    </Box>
  ) : (
    <>Test</>
  );
}

export default SideTab;
