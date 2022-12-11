//common application Details

import { GenderENUM } from '../enums';

export interface CommonApplicationDetails {
  address: null | Array<AddressItem>;
  banking_detail: null | BankingData;
  document_detail: null | Array<DocumentItem> | DocumentItem;
  expense_detail: ExpenseDetail;
  id: number;
  income: Income;
  loan_objective: null;
  interest: null;
  application_id: null;
  net_worth: NetWorth;
  occupation: null | Array<OccupationItem>;
  self_employment: null | Array<SelfEmploymentItem>;
  security_details: null | Array<SecurityDetailItem>;
}

//eligibilty
export interface EligibilityCriteriaItem {
  eligibility: number;
  necessary_check_failed: boolean;
  eligibility_title: string;
  score: number;
  is_necessary: boolean;
  weight?: number;
  weighted_score?: number;
}

export interface EligibilityResultData {
  id: number;
  total_score: number;
  eligibility_criteria_result: Array<EligibilityCriteriaItem>;
}
export interface NetWorth {
  total_estimated_assets: number;
  total_liabilities: number;
}

//guarantor
export interface GuarantorData {
  net_worth: NetWorth;
  user: GuarantorUserData;
}

export interface GuarantorUserData {
  date: string;
  email: string;
  id: number;
  image: string;
  is_firm: boolean;
  landline_num: string | null;
  mobile_num: string;
  name_en: string;
  name_np: string;
  bank_account_number: string;
  total_estimated_assets: string;
}

// address

export interface AddressItem {
  id: number;
  province: OptionValuesWithLanguage;
  district: OptionValuesWithLanguage;
  local_body: OptionValuesWithLanguage;
  address_type: OptionValues;
  ward_number: string;
  tole_street_road: string;
  house_number: null | string;
  nearest_landmark: string;
}

//banking

export interface BankingData {
  has_bank_account: boolean;
  bank_account_number: string;
  bank_join_date: string;
  bank_account_branch: OptionValuesWithLanguage;
  province: OptionValuesWithLanguage;
}

//document
export interface DocumentItem {
  minimal_documents: DocumentItemData[] | null;
  additional_documents: DocumentItemData[] | null;
}

export interface DocumentItemData {
  id: number;
  document: Document;
  file: string;
  document_number: string;
  document_issue_date?: string;
  document_issue_place: string;
  document_expiry_date?: any;
  individual_form: number;
  institutional_form?: any;
  gurantor_form?: any;
  personal_user: number;
  institutional_user?: any;
}

interface Document {
  id: number;
  document_title: DocumentTitle;
  is_minimum_required: boolean;
}

interface DocumentTitle {
  id: number;
  name_en: string;
  name_np: string;
  short_name?: string;
}

//expense

export interface ExpenseDetail {
  id: number;
  travel: number;
  insurance: number;
  rent: number;
  living: number;
  telephone_gas_electricity: number;
  land_tax: number;
  income_tax: number;
  emi: number;
  others: string;
  other_expense: number;
}

//income

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

//occupation

export interface OccupationItem {
  id: number;
  company_name: string;
  position: string;
  experience: number;
  remaining_years: number;
  occupation: OptionValues;
  time_interval_of_income_generation: OptionValues;

  other?: string;
}
//self Employment

export interface SelfEmploymentItem {
  id: number;
  self_employment: OptionValues;
  experience: number | null;
  time_interval_of_income_generation?: OptionValues;
  other?: string;
  user: number;
}

//self Employment

export interface SecurityDetailItem {
  id: number;
  personal_form: number;
  other: string;
  estimated_value: string;
  nature_of_security: string;
  collateral_place: string;
  security_type: string;
  address: Address;
  longitude: number | string;
  latitude: number | string;
}

interface Address {
  id: number;
  province: OptionValuesWithLanguage;
  district: OptionValuesWithLanguage;
  local_body: OptionValuesWithLanguage;
  ward_no: number;
  tole_street_road: string;
  house_num?: any;
  nearest_landmark: string;
  address_type: Addresstype;
  user: number;
  form_type: string;
  form: number;
}

interface Addresstype {
  id: string;
  address_type: string;
}

//remarks

export interface RemarksItem {
  id: number;
  reason: string;
  status: string;
  created_by?: RemarksCreatedBy;
  user: OptionValues;
  date: string;
  time: string;
}
interface RemarksCreatedBy {
  image: string;
  name: string;
}

// financialDetail

export interface FinancialDetailItem {
  id: number;
  sales: number;
  net_profit: number;
  total_assets: number;
  total_equity: number;
  total_liabilities: number;
  current_assets: number;
  current_liabilities: number;
  fiscal_year: OptionValuesWithType;
  financial_document_type: OptionValues;
}

//user detail

export interface IndividualUser {
  id: number;
  honorific_title: string;
  first_name: string;
  first_name_np: string;
  middle_name: string;
  middle_name_np: string;
  last_name: string;
  last_name_np: string;
  date_of_birth: string;
  gender: GenderENUM;
  landline_number: string;
  father_name: string;
  father_name_np: string;
  grandfather_name: string;
  grandfather_name_np: string;
  father_in_law_name?: string;
  father_in_law_name_np?: string;
  marital_status: boolean;
  spouse_name?: string;
  spouse_name_np?: string;
  dependent_parent_number: number;
  dependent_child_number: number;
  picture: string | null;
}

export interface InstitutionUser {
  id: number;
  institution_name: string;
  institution_name_np: string;
  image: string;
  landline_number: string;
  pan_number: string;
  registration_number: string;
  registered_authority: string;
  registered_date: string;
  registered_address: string;
  business_type: OptionValues;
  email: string;
  mobile_number: string;
}

//project

export interface ProjectDetailItem {
  id: number;
  description: string;
  project_expenditures: null | Array<ProjectExpenditure>;
}

export interface ProjectExpenditure {
  id: number;
  particulars: string;
  unit: string;
  quantity: number;
}

//stakeholder

export interface StakeholderItem {
  id: number;
  name: string;
  address: string;
  father_name: string;
  grandfather_name: string;
  date_of_birth: string;
  mobile_num: string;
  citizenship_num: string;
  citizenship_issued_date: string;
  citizenship_issued_district: number | string;
  citizenship_issued_district_data: IssueDistrict;
  share_percentage: number;
  institutional_form: number;
  is_main_person: boolean;
}

export interface IssueDistrict {
  id: number;
  name_en: string;
  name_np: string;
  province: number;
}

//financial detail

export interface OtherBankLoanDetail {
  bank_name: string;
  existing_loan_amount: number;
  id: number;
  institution_form: number;
}
