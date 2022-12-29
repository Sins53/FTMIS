import { lazy } from 'react';
import { RouteProperties, SCREEN_CODE, USER_TYPE } from './props';

const MasterData = lazy(() => import('@/core/Protected/MasterData/MasterData'));
const Designation = lazy(() => import('@/core/Protected/MasterData/Designation'));
const Branch = lazy(() => import('@/core/Protected/MasterData/Branch'));
const AssignOffice = lazy(() => import('@/core/Protected/MasterData/AssignOffice'));
const Department = lazy(() => import('@/core/Protected/MasterData/Department'));
const SelfEmployment = lazy(() => import('@/core/Protected/MasterData/SelfEmployment'));
const Occupation = lazy(() => import('@/core/Protected/MasterData/Occupation'));
const ProvinceSetup = lazy(() => import('@/core/Protected/MasterData/ProvinceSetup/index'));
const FiscalYear = lazy(() => import('@/core/Protected/MasterData/FiscalYear/index'));
const LocalGovernment = lazy(() => import('@/core/Protected/MasterData/LocalGovernment'));
const IndicatorSetup = lazy(() => import('@/core/Protected/MasterData/IndicatorSetup'));

const root = '/master/';

export const masterConfigurationPath = {
  designation: root + 'designation',
  department: root + 'department',
  assignOffice: root + 'assign-office',
  branch: root + 'branch-setup',
  selfEmployment: root + 'self-employment',
  occupation: root + 'occupation',
  provinceSetup: root + 'province-setup',
  fiscalYear: root + 'fiscal-year',
  localGovernment: root + 'local-government-setup',
  indicatorSetup: root + 'indicator-setup'
};
export const masterConfigurationRoutes: RouteProperties = {
  path: root,
  element: MasterData,
  whiteList: true,
  children: [
    {
      path: masterConfigurationPath.provinceSetup,
      element: ProvinceSetup,
      whiteList: true
    },
    {
      path: masterConfigurationPath.department,
      element: Department,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.DEPARTMENT]
    },
    {
      path: masterConfigurationPath.designation,
      element: Designation,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.DESIGNATION]
    },
    {
      path: masterConfigurationPath.branch,
      element: Branch,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.BRANCH_SETUP]
    },
    {
      path: masterConfigurationPath.assignOffice,
      element: AssignOffice,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.ASSIGN_OFFICE]
    },
    {
      path: masterConfigurationPath.selfEmployment,
      element: SelfEmployment,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.SELF_EMPLOYMENT]
    },
    {
      path: masterConfigurationPath.occupation,
      element: Occupation,
      user_type: [USER_TYPE.INTERNAL],
      screen_codes: [SCREEN_CODE.OCCUPATION]
    },
    {
      path: masterConfigurationPath.fiscalYear,
      element: FiscalYear,
      whiteList: true
    },
    {
      path: masterConfigurationPath.localGovernment,
      element: LocalGovernment,
      whiteList: true
    },
    {
      path: masterConfigurationPath.indicatorSetup,
      element: IndicatorSetup,
      whiteList: true
    }
  ]
};
