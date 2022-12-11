import { PermissionItem, UserType } from '@/genericQueries/genericQueriesSchema';

import React from 'react';

import { useUserData } from '../genericQueries/userQuery';
export interface Roles {
  code: string;
  name: string;
  roleId: number;
}

export interface UserDetailInterface {
  departments: Array<string>;
  designation: string;
  email: string;
  employeeCode: string;
  name: string;
  userId: string;
  username: string;
  profile_pic?: string;
}

export interface ApplicationContextInterface {
  permissions: null | Array<PermissionItem>;
  user: null | UserType;
  isAuthenticating: boolean;
  error: boolean;
}
export interface ScreenPermissions {
  [key: string]: any;
}

export interface ModulePermissions {
  [key: string]: PrivilegePermissions;
}

export interface PrivilegePermissions {
  [key: string]: number;
}

export interface Role {
  code: string;
  name: string;
  roleId: number;
}

export const ApplicationContext = React.createContext<ApplicationContextInterface>({
  permissions: null,
  user: null,
  isAuthenticating: true,
  error: false
});

interface Props {
  children: React.ReactNode;
}

export function ApplicationProvider(props: Props) {
  const { data, isLoading, isError } = useUserData();

  return (
    <ApplicationContext.Provider
      value={{
        permissions: data?.data?.data?.permissions ?? null,
        user: data?.data?.data?.user ?? null,
        isAuthenticating: isLoading,
        error: isError
      }}>
      {props.children}
    </ApplicationContext.Provider>
  );
}
