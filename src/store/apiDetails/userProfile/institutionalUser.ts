import { RequestBodyType, RequestMethod } from './../request';
const prefix = 'users/profile';
const institutionLoanPrefix = 'loan_management/institution-form';
const loanPrefix = 'loan_management';

const institutionalUsers = {
  getCurrentInstitutionalUser: {
    controllerName: prefix + '/institutional-user',
    queryKeyName: 'GET_CURRENT_INSTITUTIONAL_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getInstitutionalUserFullDetail: {
    controllerName: prefix + '/institution-user/full-detail',
    queryKeyName: 'GET_INSTITUTIONAL_FULL_DETAIL',
    requestBodyType: RequestBodyType.AUTH
  },
  getInstitutionalUserLoanFullDetail: {
    controllerName: institutionLoanPrefix + '/full-detail/{id}',
    queryKeyName: 'GET_INSTITUTIONAL_LOAN_FULL_DETAIL',
    requestBodyType: RequestBodyType.AUTH
  },
  getCurrentInstitutionalUserForLoanJourney: {
    controllerName: institutionLoanPrefix + '/general-detail/{id}',
    queryKeyName: 'GET_CURRENT_INSTITUTIONAL_FOR_LOAN_JOURNEY_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  editInstitutionalProfile: {
    controllerName: prefix + '/institutional-user',
    queryKeyName: 'EDIT_INSTITUTIONAL_PROFILE',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  editInstitutionalProfileForLoanJourney: {
    controllerName: institutionLoanPrefix + '/general-detail/{id}',
    queryKeyName: 'EDIT_INSTITUTIONAL_PROFILE_FOR_LOAN_JOURNEY',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  getInstitutionalUserById: {
    controllerName: prefix + '/institution-user/{id}',
    queryKeyName: 'GET_INSTITUTIONAL_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH
  },
  editInstitutionalById: {
    controllerName: prefix + '/institutional-user/{id}',
    queryKeyName: 'EDIT_INSTITUTIONAL_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  bankingDetails: {
    getInstitutionalBankingDetailList: {
      controllerName: '/users/institution-user/banking-details',
      queryKeyName: 'GET_INSTITUTIONALL_BANKING_DETAILS_LIST',
      requestBodyType: RequestBodyType.AUTH
    },
    updateInstitutionalBankingDetailList: {
      controllerName: '/users/institution-user/banking-details',
      queryKeyName: 'UPDATE_INSTITUTIONALL_BANKING_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    getInstitutionalBankingDetailForLoanJourney: {
      controllerName: institutionLoanPrefix + '/banking-detail/{loanId}',
      queryKeyName: 'GET_INSTITUTIONALL_BANKING_DETAILS_LIST_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH
    },
    updateInstitutionalBankingDetailForLoanJourney: {
      controllerName: institutionLoanPrefix + '/banking-detail/{loanId}',
      queryKeyName: 'UPDATE_INSTITUTIONALL_BANKING_DETAILS_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  finalcialDetails: {
    getFinancialDetails: {
      controllerName: institutionLoanPrefix + '/financial-detail/list/{loanId}',
      queryKeyName: 'GET_INSTITUTIONAL_FINANCIAL_DETAIL',
      requestBodyType: RequestBodyType.AUTH
    },
    createFinancialDetail: {
      controllerName: institutionLoanPrefix + '/financial-detail/create',
      queryKeyName: 'CREATE_INSTITUTIONAL_FINANCIAL_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    updateFinancialDetail: {
      controllerName: institutionLoanPrefix + '/financial-detail/{id}',
      queryKeyName: 'UPDATE_INSTITUTIONAL_FINANCIAL_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteInstitutionFinincialdetail: {
      controllerName: institutionLoanPrefix + '/financial-detail/{id}',
      queryKeyName: 'DELETE_INSTITUTIONAL_LOAN_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    getInstitutionLoandetails: {
      controllerName: institutionLoanPrefix + '/other-bank-loan/list/{loanId}',
      queryKeyName: 'GET_INSTITUTIONAL_LOAN_DETAIL',
      requestBodyType: RequestBodyType.AUTH
    },
    createInstitutionLoandetail: {
      controllerName: institutionLoanPrefix + '/other-bank-loan',
      queryKeyName: 'CREATE_INSTITUTIONAL_LOAN_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    updateInstitutionLoandetail: {
      controllerName: institutionLoanPrefix + '/other-bank-loan/{id}',
      queryKeyName: 'UPDATE_INSTITUTIONAL_LOAN_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteInstitutionLoandetail: {
      controllerName: institutionLoanPrefix + '/other-bank-loan/{id}',
      queryKeyName: 'DELETE_INSTITUTIONAL_LOAN_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    validateFinincialDetail: {
      controllerName: loanPrefix + '/financial-detail/validate/{formId}',
      queryKeyName: 'VALIDATE_FININCIAL_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    }
  },
  stakeHolderDetails: {
    getStakeHolderList: {
      controllerName: institutionLoanPrefix + '/stake-holders/{formId}/list',
      queryKeyName: 'GET_STAKEHOLDER_DETAIL',
      requestBodyType: RequestBodyType.AUTH
    },
    createStakeHolderDetail: {
      controllerName: institutionLoanPrefix + '/stake-holders/{formId}/create',
      queryKeyName: 'CREATE_STAKEHOLDER_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    updateStakeHolderDetail: {
      controllerName: institutionLoanPrefix + '/stake-holders/{formId}/update/{id}',
      queryKeyName: 'UPDATE_STAKEHOLDER_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteStakeHolderDetail: {
      controllerName: institutionLoanPrefix + '/stake-holders/{formId}/update/{id}',
      queryKeyName: 'DELETE_STAKEHOLDER_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    }
  },
  projectExpenditure: {
    getProjectExpenditureList: {
      controllerName: loanPrefix + '/project-detail/{formId}',
      queryKeyName: 'GET_PROJECT_EXPENDITURE_DETAIL',
      requestBodyType: RequestBodyType.AUTH
    },
    createProjectExpenditureDetail: {
      controllerName: loanPrefix + '/project-detail/create',
      queryKeyName: 'CREATE_PROJECT_EXPENDITURE_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    updateProjectExpenditureDetail: {
      controllerName: loanPrefix + '/project-detail/update/{id}',
      queryKeyName: 'UPDATE_PROJECT_EXPENDITURE_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteProjectExpenditureDetail: {
      controllerName: loanPrefix + '/project-detail/delete/{id}',
      queryKeyName: 'DELETE_PROJECT_EXPENDITURE_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    deleteProjectExpenditureItem: {
      controllerName: loanPrefix + '/project-expenditure/delete/{expId}',
      queryKeyName: 'DELETE_PROJECT_EXPENDITURE_ITEM',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    }
  },
  security: {
    getInstitutionalSecurityList: {
      controllerName: institutionLoanPrefix + '/security-detail/list/{formId}',
      queryKeyName: 'GET_INSTITUTIONAL_SECURITY_LIST',
      requestBodyType: RequestBodyType.AUTH
    },
    updateInstitutionalSecurity: {
      controllerName: institutionLoanPrefix + '/security-detail/update/{id}',
      queryKeyName: 'UPDATE_INSTITUTIONAL_SECURITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteInstitutionalSecurity: {
      controllerName: institutionLoanPrefix + '/security-detail/delete/{id}',
      queryKeyName: 'DELETE_INSTITUTIONAL_SECURITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    createInstitutionalSecurity: {
      controllerName: institutionLoanPrefix + '/security-detail',
      queryKeyName: 'CREATE_INSTITUTIONAL_SECURITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    }
  },
  getInstitutionalSummary: {
    controllerName: institutionLoanPrefix + '/{id}/summary',
    queryKeyName: 'GET_INSTITUTION_SUMMARY_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  institutionalFinalProceed: {
    controllerName: institutionLoanPrefix + '/{id}/proceed',
    queryKeyName: 'SUBMID_INSTITUTION_FINAL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

export default institutionalUsers;
