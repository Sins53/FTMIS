import { roleManagementPath } from '@/routes/role-management';
import { PRIVILEGEMODULE, PRIVILEGES, PRIVILEGESCREEN } from '@/shared/enums';
import { AiOutlineDashboard, AiOutlineUserAdd } from 'react-icons/ai';

import { RiEqualizerLine } from 'react-icons/ri';

export interface SidebarElementConfig {
  path?: string;
  title: string;
  icon?: React.ReactElement;
  privilege?: {
    screen: PRIVILEGESCREEN | '';
    module: PRIVILEGEMODULE | PRIVILEGESCREEN | '';
    privilege: PRIVILEGES | '';
  };
  children?: SidebarElementConfig[];
  key: string;
}

export const SidebarRoutes: SidebarElementConfig[] = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    path: '/',
    privilege: undefined,
    icon: <AiOutlineDashboard />
  },

  {
    title: 'Master Configuration',
    key: 'masterConfiguration',
    icon: <RiEqualizerLine />,
    privilege: {
      screen: PRIVILEGESCREEN.MASTERCONFIGURATION,
      module: '',
      privilege: ''
    },
    children: []
  },

  {
    title: 'Role Management',
    key: 'Role',
    icon: <AiOutlineUserAdd />,
    privilege: {
      screen: PRIVILEGESCREEN.ROLE,
      module: '',
      privilege: ''
    },
    children: [
      {
        title: 'Screen',
        path: roleManagementPath.screenGroup,
        key: 'screen',
        privilege: {
          screen: PRIVILEGESCREEN.ROLE,
          module: PRIVILEGEMODULE.SCREEN,
          privilege: ''
        }
      },
      {
        title: 'Privilege',
        path: roleManagementPath.privilegeList,
        key: 'privilege',
        privilege: {
          screen: PRIVILEGESCREEN.ROLE,
          module: PRIVILEGEMODULE.PRIVILEGE,
          privilege: ''
        }
      },
      {
        title: 'Module',
        path: roleManagementPath.moduleList,
        key: 'module',
        privilege: {
          screen: PRIVILEGESCREEN.ROLE,
          module: PRIVILEGEMODULE.MODULE,
          privilege: ''
        }
      },
      {
        title: 'Roles',
        path: roleManagementPath.roleAssignment,
        key: 'roles',
        privilege: {
          screen: PRIVILEGESCREEN.ROLE,
          module: PRIVILEGEMODULE.ROLES,
          privilege: ''
        }
      }
    ]
  }
];
