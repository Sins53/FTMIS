import { RequestBodyType, RequestMethod } from './../request';
const prefix = 'users/profile';
const loanPrefix = 'loan_management/individual-form';
const loanInitialPrefix = 'loan_management';
const docsPrifix = 'document_management';

const individualUsers = {
  getCurrentIndividualUser: {
    controllerName: prefix + '/individual-user',
    queryKeyName: 'GET_CURRENT_INDIVIDUAL_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getIndividualUserFullDetail: {
    controllerName: prefix + '/individual-user/full-detail',
    queryKeyName: 'GET_INDIVIDUAL_FULL_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getIndividualUserLoanFullDetail: {
    controllerName: loanPrefix + '/full-detail/{id}',
    queryKeyName: 'GET_INDIVIDUAL_LOAN_FULL_DETAIL',
    requestBodyType: RequestBodyType.AUTH
  },
  getCurrentIndividualUserByFormId: {
    controllerName: loanPrefix + '/general-detail/{formId}',
    queryKeyName: 'GET_CURRENT_INDIVIDUAL_DATA_BY_LOAN_ID',
    requestBodyType: RequestBodyType.AUTH
  },
  updateIndividualDetail: {
    controllerName: prefix + '/individual-user',
    queryKeyName: 'UPDATE_INDIVIDUAL_DETAIL',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  updateIndividualDetailFormId: {
    controllerName: loanPrefix + '/general-detail/{formId}',
    queryKeyName: 'UPDATE_CURRENT_INDIVIDUAL_DATA_BY_LOAN_ID',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  getIndividualUserById: {
    controllerName: prefix + '/individual-user/{id}',
    queryKeyName: 'GET_INDIVIDUAL_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH
  },
  editIndividualById: {
    controllerName: prefix + '/individual-user/{id}',
    queryKeyName: 'EDIT_INDIVIDUAL_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  documents: {
    getMinimalDocumentList: {
      controllerName: docsPrifix + '/minimal-documents',
      queryKeyName: 'GET_MINIMAL_DOCS_LIST',
      requestBodyType: RequestBodyType.AUTH
    },
    uploadDocument: {
      controllerName: docsPrifix + '/document/upload',
      queryKeyName: 'UPLOAD_APPLICANT_DOCUMENT',
      requestBodyType: RequestBodyType.FORMDATA,
      requestMethod: RequestMethod.POST
    },
    updateDocument: {
      controllerName: docsPrifix + '/document/{id}/update',
      queryKeyName: 'UPDATE_APPLICANT_DOCUMENT',
      requestBodyType: RequestBodyType.FORMDATA,
      requestMethod: RequestMethod.PUT
    },
    getApplicantDocumentList: {
      controllerName: docsPrifix + '/minimum-document/applicant/uploads',
      queryKeyName: 'GET_APPLICANT_DOCS_LIST',
      requestBodyType: RequestBodyType.AUTH
    }
  },
  occupation: {
    getIndividualUserOccupationList: {
      controllerName: prefix + '/individual-user/occupation/list',
      queryKeyName: 'GET_INDIVIDUAL_USER_OCCUPATION_LIST',
      requestBodyType: RequestBodyType.AUTH
    },
    updateIndividualUserOccupationList: {
      controllerName: prefix + '/individual-user/occupation/{id}/update',
      queryKeyName: 'UPDATE_INDIVIDUAL_USER_OCCUPATION',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteIndividualUserOccupationList: {
      controllerName: prefix + '/individual-user/occupation/{id}/delete',
      queryKeyName: 'DELETE_INDIVIDUAL_USER_OCCUPATION',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    createIndividualUserOccupation: {
      controllerName: prefix + '/individual-user/occupation/create',
      queryKeyName: 'CREATE_INDIVIDUAL_USER_OCCUPATION',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    getIndividualUserOccupationForLoanJourney: {
      controllerName: loanPrefix + '/occupation-detail/list/{loanId}',
      queryKeyName: 'GET_INDIVIDUAL_USER_OCCUPATION_LIST_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH
    },
    updateIndividualUserOccupationForLoanJourney: {
      controllerName: loanPrefix + '/occupation-detail/{id}',
      queryKeyName: 'UPDATE_INDIVIDUAL_USER_OCCUPATION_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteIndividualUserOccupationForLoanJourney: {
      controllerName: loanPrefix + '/occupation-detail/{id}',
      queryKeyName: 'DELETE_INDIVIDUAL_USER_OCCUPATION_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    createIndividualUserOccupationForLoanJourney: {
      controllerName: loanPrefix + '/occupation-detail',
      queryKeyName: 'CREATE_INDIVIDUAL_USER_OCCUPATION_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    }
  },
  selfEmployement: {
    getIndividualUserSelfEmployementList: {
      controllerName: prefix + '/individual-user/employment/list',
      queryKeyName: 'GET_INDIVIDUAL_USER_SELFEMPLOYEMENT_LIST',
      requestBodyType: RequestBodyType.AUTH
    },
    updateIndividualUserSelfEmployementList: {
      controllerName: prefix + '/individual-user/employment/{id}/update',
      queryKeyName: 'UPDATE_INDIVIDUAL_USER_SELFEMPLOYEMENT',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    getIndividualUserSelfEmployementForLoanJourney: {
      controllerName: loanPrefix + '/self-employment-detail/list/{loanId}',
      queryKeyName: 'GET_INDIVIDUAL_USER_SELFEMPLOYEMENT_LIST_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH
    },
    updateIndividualUserSelfEmployementForLoanJourney: {
      controllerName: loanPrefix + '/self-employment-detail/{id}',
      queryKeyName: 'UPDATE_INDIVIDUAL_USER_SELFEMPLOYEMENT_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteIndividualUserSelfEmployementList: {
      controllerName: prefix + '/individual-user/employment/{id}/delete',
      queryKeyName: 'DELETE_INDIVIDUAL_USER_SELFEMPLOYEMENT',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    deleteSelfEmployementForLoanJourney: {
      controllerName: loanPrefix + '/self-employment-detail/{id}',
      queryKeyName: 'DELETE_INDIVIDUAL_USER_SELFEMPLOYEMENT_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    createIndividualUserSelfEmployement: {
      controllerName: prefix + '/individual-user/employment/create',
      queryKeyName: 'CREATE_INDIVIDUAL_USER_SELFEMPLOYEMENT',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    createIndividualUserSelfEmployementForLoanJourney: {
      controllerName: loanPrefix + '/self-employment-detail',
      queryKeyName: 'CREATE_INDIVIDUAL_USER_SELFEMPLOYEMENT_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    }
  },
  address: {
    getIndividualAddressList: {
      controllerName: prefix + '/individual-user/address/list',
      queryKeyName: 'GET_ADDRESS_DETAILS',
      requestBodyType: RequestBodyType.AUTH
    },
    getIndividualAddressListForLoanJourney: {
      controllerName: loanInitialPrefix + '/form/address/list',
      queryKeyName: 'GET_ADDRESS_DETAILS_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH
    },
    createAddressDetails: {
      controllerName: prefix + '/individual-user/address/add',
      queryKeyName: 'EDIT_ADDRESS_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    createAddressDetailsForLoanJourney: {
      controllerName: loanInitialPrefix + '/form/address',
      queryKeyName: 'EDIT_ADDRESS_DETAILS_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    updateAddressDetails: {
      controllerName: prefix + '/individual/address/{addressId}',
      queryKeyName: 'UPDATE_ADDRESS_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    updateAddressDetailsForLoanJourney: {
      controllerName: loanInitialPrefix + '/form/address/{addressId}',
      queryKeyName: 'UPDATE_ADDRESS_DETAILS_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteAddressDetailForLoanJourney: {
      controllerName: loanInitialPrefix + '/form/address/{addressId}',
      queryKeyName: 'DELETE_ADDRESS_DETAILS_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    deleteAddressDetail: {
      controllerName: prefix + '/individual/address/{addressId}',
      queryKeyName: 'DELETE_ADDRESS_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    validateAddressDetails: {
      controllerName: loanInitialPrefix + '/form/address/validate',
      queryKeyName: 'VALIDATE_ADDRESS_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    }
  },
  bankingDetails: {
    getIndividualUserBankingDetailList: {
      controllerName: '/users/individual-user/banking-details',
      queryKeyName: 'GET_INDIVIDUAL_BANKING_DETAILS_LIST',
      requestBodyType: RequestBodyType.AUTH
    },
    updateIndividualUserBankingDetailList: {
      controllerName: '/users/individual-user/banking-details',
      queryKeyName: 'UPDATE_INDIVIDUAL_BANKING_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    getIndividualUserBankingDetailForLoanJourney: {
      controllerName: loanPrefix + '/banking-detail/{loanId}',
      queryKeyName: 'GET_INDIVIDUAL_BANKING_DETAILS_LIST_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH
    },
    updateIndividualUserBankingDetailForLoanJourney: {
      controllerName: loanPrefix + '/banking-detail/{loanId}',
      queryKeyName: 'UPDATE_INDIVIDUAL_BANKING_DETAILS_LOAN_JOURNEY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  income: {
    getIncomeDetails: {
      controllerName: loanInitialPrefix + '/income-details/{loanId}',
      queryKeyName: 'GET_INCOME_DETAILS',
      requestBodyType: RequestBodyType.AUTH
    },
    updateIncomeDetails: {
      controllerName: loanInitialPrefix + '/income-details/{loanId}',
      queryKeyName: 'UPDATE_INCOME_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    createIncomeDetails: {
      controllerName: loanInitialPrefix + '/income-details',
      queryKeyName: 'UPDATE_INCOME_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },

    updateOtherIncomeSourcesDetails: {
      controllerName: loanInitialPrefix + '/income-details/other-sources/update/{incomeId}',
      queryKeyName: 'UPDATE_INCOME_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    incomeDelete: {
      controllerName: loanInitialPrefix + '/income-details/{loanId}',
      queryKeyName: 'INCOME_DELETE',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    incomeGuarantorDelete: {
      controllerName: loanInitialPrefix + '/guarantor-form/income-detail/{loanId}',
      queryKeyName: 'INCOME_GUARANTOR_DELETE',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    deleteOtherSourcesDetails: {
      controllerName: loanInitialPrefix + '/income-details/other-sources/delete/{incomeId}',
      queryKeyName: 'DELETE_OTHER_INCOME_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    getOtherIncomeSourcesDetails: {
      controllerName: loanInitialPrefix + '/income-details/other-sources/list',
      queryKeyName: 'GET_OTHER_SOURCES_INCOME_DETAILS',
      requestBodyType: RequestBodyType.AUTH
    },
    addOtherIncomeSourcesDetails: {
      controllerName: loanInitialPrefix + '/income-details/other-sources',
      queryKeyName: 'UPDATE_INCOME_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    }
  },
  expense: {
    getExpenseDetails: {
      controllerName: loanInitialPrefix + '/loan-expense/{loanId}',
      queryKeyName: 'GET_EXPENSE_DETAILS',
      requestBodyType: RequestBodyType.AUTH
    },
    createExpenseDetails: {
      controllerName: loanInitialPrefix + '/loan-expense/create',
      queryKeyName: 'CREATE_EXPENSE_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },

    updateExpenseDetails: {
      controllerName: loanInitialPrefix + '/loan-expense/{id}',
      queryKeyName: 'UPDATE_EXPENSE_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  netWorth: {
    getNetWorthDetails: {
      controllerName: loanPrefix + '/{loanId}/networth',
      queryKeyName: 'GET_NetWorth_DETAILS',
      requestBodyType: RequestBodyType.AUTH
    },
    updateNetWorthDetails: {
      controllerName: loanPrefix + '/{loanId}/networth',
      queryKeyName: 'UPDATE_NET_WORTH_DETAILS',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  security: {
    getIndividualUserSecurityList: {
      controllerName: loanPrefix + '/security-details/list/{id}',
      queryKeyName: 'GET_INDIVIDUAL_SECURITY_LIST',
      requestBodyType: RequestBodyType.AUTH
    },

    updateIndividualUserSecurityList: {
      controllerName: loanPrefix + '/security-details/{securityId}',
      queryKeyName: 'UPDATE_INDIVIDUAL_SECURITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteIndividualUserSecurityList: {
      controllerName: loanPrefix + '/security-details/{securityId}',
      queryKeyName: 'DELETE_INDIVIDUAL_SECURITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    },
    createIndividualUserSecurity: {
      controllerName: loanPrefix + '/security-detail',
      queryKeyName: 'CREATE_INDIVIDUAL_SECURITY',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    }
  },
  validateOccupationSelfEmployment: {
    controllerName: loanInitialPrefix + '/employment-detail/validate/{formId}',
    queryKeyName: 'VALIDATE_OCCUPATION_SELF_EMPLOYMENT',
    requestBodyType: RequestBodyType.AUTH
  },
  getUserSummary: {
    controllerName: loanInitialPrefix + '/summary-detail/{id}',
    queryKeyName: 'GET_SUMMARY_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  finalProceed: {
    controllerName: loanInitialPrefix + '/summary-detail/{id}/proceed',
    queryKeyName: 'SUBMID_FINAL_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};
export default individualUsers;
