import roleManagement from './role-management';
import userManagement from './user-management';

import requisition from './requisition';
import masterData from './masterData';
import general from './general';
import userRegistration from './userRegistration';
import userLists from './user-list/user-list';
import userProfile from './userProfile';
import loanManagement from './loanManagement';
import dashboard from './dashboard';
import userActivity from './userActivity/userActivity';
import psychometricApis from './psychometric';
import equalizationGrant from './equalizationGrant';

export enum RequestMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK'
}

export enum RequestBodyType {
  /**If request id in application/x-www-form-urlencoded as string*/
  QUERYSTRING = 'QUERY-STRING',
  /**If request is in formdata*/
  FORMDATA = 'FORM-DATA',
  /**If request requires Bearer*/
  AUTH = 'AUTH',
  /**If request is open*/
  NOAUTH = 'NO-AUTH',
  FILE = 'FILE'
}

/**
 * API detail with query keys associated with it
 */
export interface APIDetailType {
  /**Query Keys Action Name */
  queryKeyName: string;
  /**Request API URI */
  controllerName: string;
  /**Request Method; Defaults as GET */
  requestMethod?: RequestMethod;
  /**Request Body Type */
  requestBodyType?: RequestBodyType;
}

const apiDetails = {
  general: { ...general },
  dashboard: { ...dashboard },
  masterData: { ...masterData },
  roleManagement: { ...roleManagement },
  userManagement: { ...userManagement },
  loanManagement: { ...loanManagement },
  requisition: { ...requisition },
  userRegistration: { ...userRegistration },
  userLists: { ...userLists },
  userActivity: { ...userActivity },
  userProfile,
  psychometric: psychometricApis,
  equalizationGrant
};

type ApiList = typeof apiDetails;

export const apiList: ApiList = apiDetails;
