import React from 'react';
import { List, ListItem, TabButton, TabLink } from './routeTab-style';
export interface RouteTab {
  title: string;
  icon: React.ReactNode;
  path: string;
}

export interface TabDetail extends RouteTab {
  component: React.ReactNode;
}
export interface DefaultTabProps {
  routes: any;
  toggle: (tab: string) => void;
  activeTab: string;
  loanId: number | string | undefined;
}
interface Props {
  routes: Array<RouteTab>;
}
export default function RouteTab(props: Props) {
  const { routes } = props;
  return (
    <List className="scrollable">
      {routes.map((route) => {
        return (
          <ListItem key={route.title}>
            <TabLink to={route.path}>
              {route.icon}
              <span>{route.title}</span>
            </TabLink>
          </ListItem>
        );
      })}
    </List>
  );
}

export const DefaultTab = (props: DefaultTabProps) => {
  const { routes, toggle, activeTab, loanId } = props;

  return (
    <List className="scrollable">
      {routes.map((route: any) => {
        if (!loanId) {
          if (!route.requireLoanCheck) {
            return (
              <ListItem key={route.title}>
                <TabButton
                  className={`btn ${activeTab == route.path ? 'active' : ''}`}
                  onClick={() => toggle(route.path)}>
                  {route.icon}
                  <span>{route.title}</span>
                </TabButton>
              </ListItem>
            );
          } else return undefined;
        }
        if (!route.hide) {
          return (
            <ListItem key={route.title}>
              <TabButton className={`btn ${activeTab == route.path ? 'active' : ''}`}>
                {route.icon}
                <span>{route.title}</span>
              </TabButton>
            </ListItem>
          );
        } else return undefined;
      })}
    </List>
  );
};
