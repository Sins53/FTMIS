import { Box, FlexBox } from '@/components/core';
import classNames from 'classnames';
import React from 'react';
import { List, ListItem } from '../RouteTab/routeTab-style';
import { NavLink } from './tab-styles';

interface HeaderTabObject {
  headerName: string;
  tab: string;
  className?: string;
  icon?: React.ReactElement;
  hide?: boolean;
}
interface TabHeaderProps {
  headerTab: Array<HeaderTabObject>;
  toggle: (tab: string) => void;
  activeTab?: string;
  className?: string;
}

function TabHeader(props: TabHeaderProps) {
  const { headerTab, toggle, activeTab, className } = props;

  return activeTab ? (
    <List className={classNames(className, 'scrollable')}>
      {headerTab.length &&
        headerTab.map((data: HeaderTabObject, index: number) =>
          !data.hide ? (
            <ListItem key={index}>
              <NavLink
                className={classNames({ active: activeTab === data.tab })}
                onClick={() => {
                  toggle(data.tab);
                }}>
                <FlexBox>
                  {data.icon && (
                    <Box component="span" className="mr-2">
                      {data.icon}
                    </Box>
                  )}
                  {data.headerName}
                </FlexBox>
              </NavLink>
            </ListItem>
          ) : undefined
        )}
    </List>
  ) : (
    <>Test</>
  );
}

export default TabHeader;
