import { ROUTE_TYPE_ENUM } from '@/shared/enums/route-type';
import React from 'react';

export enum USER_TYPE {
  INDIVIDUAL = 'individual',
  INTERNAL = 'internal',
  INSTITUTION = 'institutional'
}
export enum SCREEN_CODE {
  ASSIGN_OFFICE = 'assign_office',
  BRANCH_SETUP = 'branch_setup',
  BASE_CONFIGURATION = 'base_config',
  CUSTOMER_LIST = 'customer_list',
  DECLARATION_SETUP = 'declaration_setup',
  DEPARTMENT = 'department',
  DESIGNATION = 'designation',
  DOCUMENT_GROUP = 'document_group',
  DOCUMENT_MANAGEMENT = 'document_management',
  DOCUMENT_MAPPING = 'document_mapping',
  DOCUMENT_TITLE = 'document_title',
  ELIGIBILITY_CRITERIA = 'eligibility_criteria',
  FISCAL_YEAR = 'fiscal_year',
  INTERNAL_DASHBOARD = 'internal_dashboard',
  LOAN_CATEGORY = 'loan_category',
  LOAN_MANAGEMENT = 'loan_management',
  LOAN_PRODUCT = 'loan_product',
  LOAN_TYPE = 'loan_type',
  MASTER_CONFIGURATION = 'master_configuration',
  NOTIFICATION = 'notification',
  OCCUPATION = 'occupation',
  PROVINCE_SETUP = 'province_setup',
  ROLES = 'roles',
  ROLE_MANAGEMENT = 'role_management',
  SELF_EMPLOYMENT = 'self_employment',
  USERS = 'users',
  USERS_ACTIVITY_LOGS = 'user_activity_logs',
  USER_MANAGEMENT = 'user_management',
  PSYCHOMETRIC_CONFIGURATION = 'psychometric_config',

  INDIVIDUAL_AGRICULTURAL_LOANS = 'individual_agricultural_loan',
  INDIVIDUAL_DASHBOARD = 'individual_dashboard',
  INDIVIDUAL_DOCUMENT_CHECKLIST = 'individual_document_checklist',
  INDIVIDUAL_LOAN_APPLICATIONS = 'individual_loan_applications',
  INDIVIDUAL_LOAN_LIST = 'individual_loan_list',
  INDIVIDUAL_LOAN_MANAGEMENT = 'individual_loan_management',
  INDIVIDUAL_MY_LOANS = 'individual_my_loans',
  INDIVIDUAL_NON_AGRICULTURAL_LOANS = 'individual_non_agricultural_loan',
  INDIVIDUAL_PROFILE = 'individual_profile',

  INSTITUTIONAL_AGRICULTURAL_LOANS = 'institutional_agricultural_loan',
  INSTITUTION_DASHBOARD = 'institution_dashboard',
  INSTITUTION_DOCUMENT_CHECKLIST = 'institution_document_checklist',
  INSTITUTIONAL_LOAN_APPLICATIONS = 'institutional_loan_applications',
  INSTITUTION_LOAN_LIST = 'institution_loan_list',
  INSTITUTION_LOAN_MANAGEMENT = 'institution_loan_management',
  INSTITUTION_MY_LOANS = 'institution_my_loans',
  INSTITUTIONAL_NON_AGRICULTURAL_LOANS = 'institutional_non_agricultural_loan',
  INSTITUTION_PROFILE = 'institution_profile'
}

export interface RouteProperties {
  path?: string;
  element: React.ComponentType<any>;
  type?: ROUTE_TYPE_ENUM;
  children?: RouteProperties[];
  index?: boolean;
  user_type?: Array<USER_TYPE>;
  screen_codes?: Array<SCREEN_CODE>;
  whiteList?: boolean;
}

export interface PrivateRouteProps {
  appRoutes: RouteProperties[];
}
export interface PublicRouteProps {
  appRoutes: RouteProperties[];
}
