import { BasicResponse } from '@/genericQueries/genericQueriesSchema';

import {
  AddressItem,
  BankingData,
  DocumentItem,
  DocumentItemData,
  ExpenseDetail,
  GuarantorData,
  Income,
  IndividualUser,
  OccupationItem,
  RemarksItem,
  SecurityDetailItem,
  SelfEmploymentItem
} from '@/shared/schema/commonSchema';
export interface EligibilityResultData {
  id: number;
  total_score: number;
  eligibility_criteria_result: Array<EligibilityCriteriaItem>;
}

export interface EligibilityCriteriaItem {
  eligibility: number;
  necessary_check_failed: boolean;
  eligibility_title: string;
  score: number;
  is_necessary: boolean;
}

export interface CommonIndividualData {
  id: number;
  image?: string | null;
  applied_branch?: OptionValuesWithLanguage;
  user: IndividualUser;
  address: null | Array<AddressItem>;
  document_detail: null | Array<DocumentItemData>;
  banking_detail: null | BankingData;
  income_detail: Income;
  income_from_other_sources: null;
  occupation: null | Array<OccupationItem>;
  self_employment: null | Array<SelfEmploymentItem>;
  expense_detail: ExpenseDetail;
  net_worth: NetWorth;
  security_detail: null | Array<SecurityDetailItem>;
  loan_amount: number;
  eligibility_result: null | EligibilityResultData;
  tenure: string;
  interest: string;
  loan_objective: string;
  application_id: string;
  is_collateral_less: boolean;
  loan_product?: OptionValuesWithLanguage;
  submitted_date?: string;
  status: OptionValuesWithLanguage;
  remarks: null | Array<RemarksItem>;
  guarantor_detail: null | Array<GuarantorData>;
  revolving_loan_amount: number;
  non_revolving_loan_amount: number;
  revolving_tenure?: string;
  non_revolving_tenure: string;
  revolving_interest?: string | number;
  non_revolving_interest: string | number;
  revolving_loan_objective?: string;
  non_revolving_loan_objective: string;
  total_income: number;
  total_expense: number;
}

export interface CommonIndividualDataWithAdditionalDocs
  extends Omit<CommonIndividualData, 'document_detail'> {
  document_detail: DocumentItem;
}

interface NetWorth {
  total_estimated_assets: number;
  total_liabilities: number;
}

export interface CommonIndividualDataResponse extends BasicResponse {
  data: CommonIndividualData;
}
export interface CommonIndividualDataWithAdditionalDocsResponse extends BasicResponse {
  data: CommonIndividualDataWithAdditionalDocs;
}
