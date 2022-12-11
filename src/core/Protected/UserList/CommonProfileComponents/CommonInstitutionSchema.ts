import { BasicResponse } from '@/genericQueries/genericQueriesSchema';
import {
  AddressItem,
  BankingData,
  DocumentItem,
  DocumentItemData,
  FinancialDetailItem,
  GuarantorData,
  InstitutionUser,
  OtherBankLoanDetail,
  ProjectDetailItem,
  RemarksItem,
  StakeholderItem
} from '@/shared/schema/commonSchema';
import { Omit } from 'react-beautiful-dnd';
import { EligibilityResultData } from './CommonIndividualSchema';

export interface CommonInstitutionData {
  id: number;
  image: null | string;
  interest?: number;
  user: InstitutionUser;
  address: null | Array<AddressItem>;
  document_detail: null | Array<DocumentItemData>;
  banking_detail: null | BankingData;
  project_detail: null | Array<ProjectDetailItem>;
  financial_detail: null | Array<FinancialDetailItem>;
  stakeholder: null | Array<StakeholderItem>;
  security_detail: null | Array<SecurityItem>;
  eligibility_result: null | EligibilityResultData;
  remarks: null | Array<RemarksItem>;
  loan_amount: number;
  tenure: string;
  loan_objective: string;
  application_id: string;
  submitted_date?: string;
  is_collateral_less: boolean;
  loan_product?: OptionValuesWithLanguage;
  applied_branch: OptionValuesWithLanguage;
  product_description?: string;
  status: OptionValuesWithLanguage;
  guarantor_detail: null | Array<GuarantorData>;
  other_bank_loan: null | Array<OtherBankLoanDetail>;
  revolving_loan_amount: number;
  non_revolving_loan_amount: number;
  revolving_tenure?: string;
  non_revolving_tenure: string;
  revolving_interest?: string | number;
  non_revolving_interest: string | number;
  revolving_loan_objective?: string;
  non_revolving_loan_objective: string;
}

export interface SecurityItem {
  id: number;
  institutional_form: number;
  security_type: string;
  other: string;
  estimated_value: number;
  address: AddressItem;
  nature_of_security: string;
  collateral_place: string;
  longitude: number | string;
  latitude: number | string;
}

export interface CommonInstitutionDataWithAdditionalDocs
  extends Omit<CommonInstitutionData, 'document_detail'> {
  document_detail: DocumentItem;
}

export interface CommonInstitutionDataResponse extends BasicResponse {
  data: CommonInstitutionData;
}

export interface CommonInstitutionDataWithAdditionalDocsResponse extends BasicResponse {
  data: CommonInstitutionDataWithAdditionalDocs;
}
