import { CommonArrayResponseTypes, CustomResponse } from '@/helper/default-action';
import { GenderENUM } from '@/shared/enums';

// export interface IndividualData {
//   status: boolean;
//   message: string;
//   data: Data;
// }

export interface IndividualData {
  id: number;
  honorific_title: string;
  first_name: string;
  first_name_np: string;
  middle_name: string;
  middle_name_np?: string;
  mobile_number: string;
  email: string;
  last_name: string;
  last_name_np: string;
  gender: GenderENUM;
  date_of_birth: string;
  landline_number: string;
  grandfather_name: string;
  grandfather_name_np: string;
  father_name: string;
  father_name_np: string;
  marital_status: boolean;
  spouse_name: string;
  spouse_name_np: string;
  father_in_law_name: string;
  father_in_law_name_np: string;
  dependent_parent_number: number;
  dependent_child_number: number;
  has_bank_account: boolean;
  bank_account_number: string;

  address?: Address[];
  occupation?: Occupation[];
  self_employment?: SelfemploymentData[];
  documents: Document2[];
  picture: string;
}

interface Document2 {
  id: number;
  document: Document;
  file: string;
  document_number: string;
  document_issue_date: string;
  document_issue_place: string;
  document_expiry_date?: any;
}

interface Document {
  id: number;
  document_title: DocumentTitle;
}

interface DocumentTitle {
  id: number;
  name_en: string;
  name_np?: string;
}

interface Address {
  id: number;
  province: Province;
  district: Province;
  local_body: Province;
  address_type: Addresstype;
  ward_number: string;
  tole_street_road: string;
  house_number: string;
  nearest_landmark: string;
}

interface Addresstype {
  id: string;
  address_type: string;
}

interface Province {
  id: number;
  name_en: string;
  name_np: string;
}

export interface Expensedetail {
  id: number;
  travel: number;
  insurance: number;
  rent: number;
  living: number;
  telephone_gas_electricity: number;
  land_tax: number;
  income_tax: number;
  emi: number;
}

export interface Networth {
  total_estimated_assets: number;
  total_liabilities: number;
}

export interface Income {
  id: number;
  gross_monthly_salary: number;
  net_profit_from_business: number;
  rental_income: number;
  dividend: number;
  interest_income: number;
  others: string;
  others_income: number;
}

export interface SelfemploymentData {
  id: number;
  self_employment: Selfemployment;
  experience: number;
  time_interval_of_income_generation: string;
  other: string;
  user: number;
}

interface Selfemployment {
  label: string;
  value: number;
}

export interface Occupation {
  id: number;
  company_name: string;
  position: string;
  experience: number;
  remaining_years: number;
  occupation: number;
  occupation_name: string;
  time_interval_of_income_generation: string;
  time_interval_of_income_generation_name: string;
  other?: string;
  user: number;
}

export interface FirmData {
  id?: number;
  user: number;
  institution_name: string;
  institution_name_np: string;
  registration_number: number;
  registered_authority: string;
  registered_date: string;
  pan_number: string;
  registered_address: string;
  business_type: number;
  email: string;
  mobile_number: string;
}

export interface CustomerInstitutionData {
  id: number;
  user: number;
  institution_name: string;
  email: string;
  mobile_number: string;
  landline_number?: number;
  institution_name_np?: string;
  registration_number?: string;
  registered_authority?: string;
  registered_date?: string;
  pan_number?: string;
  registered_address?: string;
  business_type: Businesstype;
  has_bank_account: boolean;
  bank_account_number?: string;
  bank_join_date?: string;
  branch?: string;
  image?: string;
  address: Address[];
  documents: MinimalDocumentData[];
}
interface Address {
  id: number;

  province_name_en: string;
  province_name_np: string;

  district_name_en: string;
  district_name_np: string;

  local_body_name_en: string;
  local_body_name_np: string;
  tole_street_road: string;
  ward_no: number;
  nearest_landmark: string;
}
interface Businesstype {
  id: string;
  business_type: string;
}
export interface MinimalDocumentData {
  id: number;
  document_title: number;
  document_title_name_en: string;
  document_title_name_np?: string;
  document_category: number;
  document_group?: string;
}
export interface CustomerDataParams extends PaginatedParams {
  customer_type?: string;
}
export interface InternalUserData {
  id: number;
  first_name: string;
  first_name_np: string;
  middle_name: string;
  middle_name_np: string;
  last_name: string;
  last_name_np: string;
  employee_id: number;
  picture: string;
  user: number;
  designation: number;
  designation_title_en: string;
  designation_title_np: string;
  province: number;
  province_name_en: string;
  province_name_np: string;
  branch: number;
  branch_name_en: string;
  branch_name_np: string;
  department: number;
  department_title_en: string;
  department_title_np: string;
  is_active: boolean;
}

export interface CustomerIndividualData {
  id: number;
  mobile_number: string;
  email: string;
  honorific_title: string;
  first_name: string;
  first_name_np?: string;
  middle_name: string;
  middle_name_np?: string;
  last_name: string;
  last_name_np?: string;
  date_of_birth?: string;
  landline_number?: string;
  pan_number?: string;
  citizenship_number?: string;
  citizenship_issued_date?: string;
  citizenship_issuing_office?: string;
  father_name?: string;
  father_name_np?: string;
  grandfather_name?: string;
  grandfather_name_np?: string;
  father_in_law_name?: string;
  father_in_law_name_np?: string;
  marital_status: boolean;
  spouse_name?: string;
  spouse_name_np?: string;
  other_identity_type: string;
  other_identity_number?: string;
  other_identity_number_issue_office: string;
  dependent_parent_number: number;
  dependent_child_number: number;
  has_bank_account: boolean;
  bank_account_number?: string;
  bank_join_date?: string;
  picture?: string;
  gender?: GenderENUM;
  user: number;
  branch?: string;
}
export type CustomerIndividualDataResponse = CommonArrayResponseTypes<CustomerIndividualData>;
export type IndividualDataResponse = CustomResponse<IndividualData>;
export type CustomerInstitutionDataResponse = CustomResponse<CustomerInstitutionData>;

export type FirmDataResponse = CommonArrayResponseTypes<FirmData[]>;

export type InternalUserDataResponse = CommonArrayResponseTypes<InternalUserData[]>;
