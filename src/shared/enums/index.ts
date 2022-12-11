import { PRIVILEGESCREEN, PRIVILEGEMODULE, PRIVILEGES } from './privilege';

enum USERTYPE {
  INTERNAL = 'internal',
  INDIVIDUAL = 'individual',
  INSTITUTIONAL = 'institutional'
}
enum LOANTYPE {
  AGRICULTURE = 'agriculture',
  NONAGRICULTURE = 'non-agriculture'
}

export enum LOAN_TYPE_ENUM {
  AGRICULTURAL = 'agricultural',
  NON_AGRICULTURAL = 'non_agricultural'
}

export enum PRIVILEGE_SCREEN_TYPE {
  USERS = 'users',
  ROLES = 'roles'
}

export enum STATUS_ENUM {
  INPROGRESS = 1,
  PENDING = 2,
  APPROVED = 3,
  REJECTED = 4,
  VERIFIED = 5,
  RE_APPLIED = 6,
  FINAL_SUBMISSION = 7,
  FINAL_REJECTION = 8
}

export const STATUS_WITH_EDIT_ACCESS = [STATUS_ENUM.PENDING, STATUS_ENUM.RE_APPLIED];
export const STATUS_WITH_LOCATION_ADD_ACCESS = [
  STATUS_ENUM.PENDING,
  STATUS_ENUM.APPROVED,
  STATUS_ENUM.VERIFIED,
  STATUS_ENUM.RE_APPLIED,
  STATUS_ENUM.FINAL_SUBMISSION
];

export enum FINANCIAL_DOCUMENT_TYPE {
  Audited = 1,
  Projected = 2,
  Provision = 3
}

export const BUSINESS_TYPE = [
  { label: 'Proprietorship', value: 1 },
  { label: 'Partnership', value: 2 },
  { label: 'Company', value: 3 },
  { label: 'Co-operative', value: 4 }
];

const HONORIFIC_TITLE = [
  { label: 'Mr', value: 1 },
  { label: 'Mrs', value: 2 },
  { label: 'Ms', value: 3 }
];

enum GenderENUM {
  MALE = '1',
  FEMALE = '2',
  OTHER = '3'
}

enum MARITAL_STATUS {
  MARRIED = '1',
  UNMARRIED = '2',
  OTHER = '3'
}

enum NatureOfSecurityENUM {
  RESIDENTIAL = 'Residential',
  BUSINESS = 'Business'
}
enum FormType {
  INDIVIDUALFORM = 'IndividualForm',
  INSTITUTIONALFORM = 'InstitutionalForm',
  GUARANTORFORM = 'GuarantorForm'
}

enum FORM_TYPE_ID {
  INDIVIDUAL = 1,
  INSTITUTIONAL = 2,
  GUARANTOR = 3
}

const FORM_TYPE_OPTIONS = [
  { label: 'Individual Form', value: 'individual_form' },
  { label: 'Institutional Form', value: 'institutional_form' },
  { label: 'Guarantor Form', value: 'guarantor_form' }
];

const INCOME_GENERATION_TIME = [
  { label: 'Monthly', value: '1' },
  { label: 'Seasonal', value: '2' },
  { label: 'Semiannual', value: '3' },
  { label: 'Annual', value: '4' }
];

const SECURITY_TYPE = [
  { label: 'Land', value: 'Land' },
  { label: 'Land Building', value: 'Land Building' },
  { label: 'Other', value: 'Other' }
];

export const INDIVIDUAL_ADDRESS_TYPE = [
  { label: 'Permanent', value: '2' },
  { label: 'Temporary', value: '1' },
  { label: 'Correspondence', value: '3' }
];

export const ADDRESS_TYPE = [
  { label: 'Permanent', value: '2' },
  { label: 'Temporary', value: '1' },
  { label: 'Correspondence', value: '3' },
  { label: 'Collateral', value: '4' }
];

export const COLLATERAL_PLACE = [
  { label: 'Metropolitan city', value: 'metropolitan_city' },
  { label: 'Sub Metropolitan City', value: 'sub_metropolitan_city' },
  { label: 'Municipality', value: 'municipality' },
  { label: 'Rural Municipality', value: 'rural_municipality' }
];

export {
  PRIVILEGEMODULE,
  PRIVILEGESCREEN,
  PRIVILEGES,
  USERTYPE,
  NatureOfSecurityENUM,
  INCOME_GENERATION_TIME,
  HONORIFIC_TITLE,
  SECURITY_TYPE,
  GenderENUM,
  LOANTYPE,
  FormType,
  FORM_TYPE_ID,
  FORM_TYPE_OPTIONS,
  MARITAL_STATUS
};

export const PARENT_TYPE = [
  { value: 1, label: 'Head Office' },
  { value: 2, label: 'Province Office' },
  { value: 3, label: 'Branch' }
];
