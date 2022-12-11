import { lazy } from 'react';
import { RouteProperties } from '../props';
const InternalUser = lazy(
  () => import('@/core/Protected/UserManagement/InternalUser/InternalUser')
);
const InternalUserRoleMapping = lazy(
  () => import('@/core/Protected/UserManagement/InternalUser/RoleMapping')
);
const InternalUserForm = lazy(
  () => import('@/core/Protected/UserManagement/InternalUser/InternalUserForm')
);
const MasterData = lazy(() => import('@/core/Protected/MasterData/MasterData'));
const CustomerList = lazy(() => import('@/core/Protected/UserList/CustomerList'));
const UserSettings = lazy(
  () => import('@/core/Protected/UserManagement/Profile/UserSetting/UserSetting')
);

const root = '/user/';

export const userManagementPath = {
  internalUser: root + 'internal',
  internalUserRoleMapping: root + 'user-access-mapping/:id',
  internalUserCreate: root + 'internal/form',
  internalUserEditProfile: root + 'profile/edit/internal',
  editInternalUser: root + 'internal/:id',
  profile: root + 'profile',
  profileSettings: root + 'profile/settings',
  profileEdit: root + 'profile/edit',
  individualGeneralDetailEdit: root + 'profile/edit/general',
  individualAddressDetailEdit: root + 'profile/edit/address',
  individualDocumentDetailEdit: root + 'profile/edit/document',
  individualExpenseEdit: root + 'profile/edit/expense',
  individualBankingEdit: root + 'profile/edit/banking',
  individualNetWorthEdit: root + 'profile/edit/net-worth',
  individualOccupationEdit: root + 'profile/edit/occupation',
  individualSelfEmploymentEdit: root + 'profile/edit/self-employment',
  individualIncomeEdit: root + 'profile/edit/income',
  individualSecurityEdit: root + 'profile/edit/security',
  institutionalProjectExpenditureEdit: root + 'profile/edit/project-expenditure',
  institutionalFinancialEdit: root + 'profile/edit/financial',
  institutionalStakeholderEdit: root + 'profile/edit/stakeholders',
  addressEdit: root + 'profile/edit/address',
  customerList: root + 'customer-list',
  customerDetailView: root + 'customer/view/:id',
  customerInstitutionDetailView: root + 'customer/institution/view/:id',
  activityLog: root + 'activity-logs'
};
export const userManagementRoutes: RouteProperties = {
  path: root,
  element: MasterData,
  whiteList: true,
  children: [
    {
      path: userManagementPath.internalUser,
      element: InternalUser,
      whiteList: true
    },
    {
      path: userManagementPath.internalUserCreate,
      element: InternalUserForm,
      whiteList: true
    },
    {
      path: userManagementPath.editInternalUser,
      element: InternalUserForm,
      whiteList: true
    },

    {
      path: userManagementPath.internalUserRoleMapping,
      element: InternalUserRoleMapping,
      whiteList: true
    },
    {
      path: userManagementPath.profileSettings,
      element: UserSettings,
      whiteList: true
    },
    {
      path: userManagementPath.customerList,
      element: CustomerList,
      whiteList: true
    }
  ]
};
