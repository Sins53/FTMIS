import loanProduct from './loanProduct';
import guarantor from './guarantor';
import individualDocument from './individualDocument';
import { RequestBodyType, RequestMethod } from '../request';
const prefix = 'loan_management';
const loanManagement = {
  loanProduct,
  guarantor,
  individualDocument,
  myLoan: {
    applyIndividualLoan: {
      controllerName: '/loan_management/individual-form',
      queryKeyName: 'ADD_LOAN_DATA',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    getAllAppliedLoans: {
      controllerName: prefix + '/individual-form',
      queryKeyName: 'GET_INDIVIDUAL_USER_APPLIED_LOANS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getMyLoanApplication: {
      controllerName: prefix + '/my-loan-applications',
      queryKeyName: 'GET_ALL_INDIVIDUAL_USER_APPLIED_LOANS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },

    getIndividualLoansDetailById: {
      controllerName: prefix + '/individual-form/{id}/summary',
      queryKeyName: 'GET_INDIVIDUAL_USER_APPLIED_LOANS_BY_ID',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    checkLoanApplicationIndividual: {
      controllerName: prefix + '/individual-form/{loanId}',
      queryKeyName: 'GET_INDIVIDUAL_APPLICATION_DATA',
      requestBodyType: RequestBodyType.AUTH
    },
    checkLoanApplicationInstitutional: {
      controllerName: prefix + '/institution-form/{loanId}',
      queryKeyName: 'GET_CURRENT_INSTITUTIONAL_DATA',
      requestBodyType: RequestBodyType.AUTH
    },
    editIndividualLoanDetail: {
      controllerName: prefix + '/individual-form/{loanId}',
      queryKeyName: 'ADD_INDIVIDUAL_LOAN_DATA',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    editInstitutionLoanDetail: {
      controllerName: prefix + '/institution-form/{loanId}',
      queryKeyName: 'ADD_INSTITUTIOANL_LOAN_DATA',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },

  institutionalLoan: {
    applyInstitutionalLoan: {
      controllerName: prefix + '/institution-form',
      queryKeyName: 'APPLY_INSTITUTIONAL_LOAN',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    getAllInstitutionalAppliedLoans: {
      controllerName: prefix + '/institution-form',
      queryKeyName: 'GET_INSTITUTIONAL_USER_APPLIED_LOANS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    }
  },
  appliedLoan: {
    appliedLoanList: {
      controllerName: prefix + '/applied-loans',
      queryKeyName: 'GET_APPLIED_LOAN_LIST',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    changeAppliedBranch: {
      controllerName: prefix + '/applied-branch-change',
      queryKeyName: 'CHANGE_APPLIED_BRANCH',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  loanApplication: {
    getIndividualApplicationList: {
      controllerName: prefix + '/admin/individual-loan-applications',
      queryKeyName: 'GET_INDIVIDUAL_APPLICATION_LIST',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getUserListByLoanProduct: {
      controllerName: prefix + '/admin/individual-loan-applications/applied-users/{productId}',
      queryKeyName: 'GET_INDIVIDUAL_APPLICATION_APPLIED_USERS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getIndividualApplicationDetail: {
      controllerName: prefix + '/admin/individual-loan-application/{loanId}',
      queryKeyName: 'GET_INDIVIDUAL_APPLICATION_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getInstitutionApplicationList: {
      controllerName: prefix + '/admin/institution-loan-applications',
      queryKeyName: 'GET_INSTITUTION_APPLICATION_LIST',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getInstitutionLoanAppliedUser: {
      controllerName: prefix + '/admin/institution-loan-applications/applied-users/{productId}',
      queryKeyName: 'GET_INSTITUTION_LOAN_APPLIED_USERS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getInstitutionApplicationDetail: {
      controllerName: prefix + '/admin/institution-loan-application/{loanId}',
      queryKeyName: 'GET_INSTITUTION_APPLICATION_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getApplicationStatus: {
      controllerName: prefix + '/application-status',
      queryKeyName: 'GET_APPLICATION_STATUS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    internalUserApplicationStatusChange: {
      controllerName: prefix + '/form/status/change',
      queryKeyName: 'STATUS_CHANGE_BY_APPROVER',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    applicantApplicationStatusChange: {
      controllerName: prefix + '/application/status/change',
      queryKeyName: 'STATUS_CHANGE_BY_CUSTOMER',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    getAllIndividualRolesMentions: {
      controllerName: prefix + '/individual_form/eligibility-criteria/list',
      queryKeyName: 'GET_ALL_INDIVIDUAL_ROLES_MENTIONS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getAllInstitutionRolesMentions: {
      controllerName: prefix + '/institutional_form/eligibility-criteria/list',
      queryKeyName: 'GET_ALL_INSTITUTIONAL_ROLES_MENTIONS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getIndividualApplicationCVS: {
      controllerName: 'reports/csv/individual-applications',
      queryKeyName: 'GET_INDIVIDUAL_APPLICATION_CVS',
      requestBodyType: RequestBodyType.FILE
    },
    getInstitutionalApplicationCVS: {
      controllerName: 'reports/csv/institutional-applications',
      queryKeyName: 'GET_INSTITUTION_APPLICATION_CVS',
      requestBodyType: RequestBodyType.FILE
    },
    getBranchListForApplicationTransfer: {
      controllerName: prefix + '/branch-transfer/branch/list',
      queryKeyName: 'GET_BRANCH_FOR_BRANCH_TRANSFER',
      requestMethod: RequestMethod.GET
    },
    getIndividualApplicationCount: {
      controllerName: prefix + '/individual-applications-count',
      queryKeyName: 'GET_INDIVIDUAL_APPLICATION_COUNT',
      requestMethod: RequestMethod.GET
    },
    getInstitutionalApplicationCount: {
      controllerName: prefix + '/institutional-applications-count',
      queryKeyName: 'GET_INSTITUTIONAL_APPLICATION_COUNT',
      requestMethod: RequestMethod.GET
    }
  },
  report: {
    getIndividualFormPDF: {
      controllerName: 'reports/pdf/individual-application/{formId}',
      queryKeyName: 'GET_INDIVIDUAL_FORM_PDF',
      requestBodyType: RequestBodyType.FILE
    },
    getInstitutionalFormPDF: {
      controllerName: 'reports/pdf/institutional-application/{formId}',
      queryKeyName: 'GET_INSTITUTION_FORM_PDF',
      requestBodyType: RequestBodyType.FILE
    }
  },
  eligibilityCriteria: {
    testIndividualEligibilityCriteria: {
      controllerName: prefix + '/individual_form/{id}/eligibility-criteria/test',
      queryKeyName: 'TEST_INDIVIDUAL_ELIGIBILITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    testInstitutionEligibilityCriteria: {
      controllerName: prefix + '/institutional_form/{id}/eligibility-criteria/test',
      queryKeyName: 'TEST_INSTITUTION_ELIGIBILITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    }
  },
  securityLocation: {
    individualSecurityLocation: {
      controllerName: prefix + '/admin/individual-form/longitude-latitude/{securityId}',
      queryKeyName: 'INDIVIDUAL_SECURITY_LOCATION',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    institutionSecurityLocation: {
      controllerName: prefix + '/admin/institution-form/longitude-latitude/{securityId}',
      queryKeyName: 'INSTITUTIONAL_SECURITY_LOCATION',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  }
};

export default loanManagement;
