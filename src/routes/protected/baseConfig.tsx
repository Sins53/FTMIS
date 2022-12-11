import { lazy } from 'react';
import { RouteProperties, SCREEN_CODE, USER_TYPE } from '../props';

const SiteSetting = lazy(() => import('@/core/Protected/SiteSetting/index'));

const root = '/base-config';

export const baseConfigPath = {
  siteSetting: root
};
export const baseConfigRoutes: RouteProperties = {
  path: root,
  element: SiteSetting,
  user_type: [USER_TYPE.INTERNAL],
  screen_codes: [SCREEN_CODE.BASE_CONFIGURATION],
  children: []
};
