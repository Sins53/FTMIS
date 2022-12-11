import ProtectedLayout from '@/core/Protected/ProtectedLayout';
import { ROUTE_TYPE_ENUM } from '@/shared/enums/route-type';
import { RouteProperties } from '../props';
import { lazy } from 'react';
import { roleManagementRoutes } from '../role-management';
import { masterConfigurationRoutes } from '../master-configuration';
import { userManagementRoutes } from './userManagement';
import { financialGrantRoutes } from './financialGrant';

import { baseConfigRoutes } from './baseConfig';

const Dashboard = lazy(() => import('@/core/Protected/Dashboard/Dashboard'));
const ErrorPage = lazy(() => import('@/authentication/500ErrorPage'));

const root = '/';

const protectedRoutes: RouteProperties[] = [
  {
    path: root,
    element: ProtectedLayout,
    type: ROUTE_TYPE_ENUM.authorized,
    index: true,
    whiteList: true,
    children: [
      {
        path: '/',
        element: Dashboard,
        whiteList: true
      },
      { ...masterConfigurationRoutes },
      { ...userManagementRoutes },
      { ...roleManagementRoutes },
      { ...baseConfigRoutes },
      { ...financialGrantRoutes },
      {
        path: root + '/error',
        element: ErrorPage,
        type: ROUTE_TYPE_ENUM.authorized,
        whiteList: true
      }
    ]
  }
];
export default protectedRoutes;
