import { RequestBodyType, RequestMethod } from '../request';
const prefix = 'loan_management/guarantor-form';
const loanPrefix = 'loan_management';

const guarantor = {
  getAllGuarantorList: {
    controllerName: prefix + '/list',
    queryKeyName: 'GET_ALL_GUARANTOR_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getGuarantorById: {
    controllerName: prefix + '/{id}',
    queryKeyName: 'GET_GUARANTOR_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getGuarantorDetailById: {
    controllerName: prefix + '/full-detail/{id}',
    queryKeyName: 'GET_GUARANTOR_FULL_DETAIL_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  addNewGuarantor: {
    controllerName: prefix + '/create',
    queryKeyName: 'ADD_GUARANTOR_DATA',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },

  editGuarantorById: {
    controllerName: prefix + '/{id}/update',
    queryKeyName: 'EDIT_GUARANTOR_DATA_BY_ID',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  deleteGuarantorById: {
    controllerName: prefix + '/{id}/delete',
    queryKeyName: 'DELETE_GUARANTOR_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  document: {
    getGuarantorMinimalList: {
      controllerName: '/document_management/guarantor-documents',
      queryKeyName: 'GET_GUARANTOR_MINIMAL_LIST',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    getGuarantorDocumentList: {
      controllerName: '/document_management/guarantor-documents/uploads/{id}',
      queryKeyName: 'GET_GUARANTOR_DOCUMENT_LIST',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    }
  },
  banking: {
    getGuarantorBankingDetail: {
      controllerName: prefix + '/banking-detail/{id}',
      queryKeyName: 'GET_GUARANTOR_BANKING_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    updateGuarantorBankingDetail: {
      controllerName: prefix + '/banking-detail/{id}',
      queryKeyName: 'UPDATE_GUARANTOR_BANKING_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  occupation: {
    getGuarantorOccupationList: {
      controllerName: loanPrefix + '/guarantor-occupation/{id}',
      queryKeyName: 'GET_GUARANTOR_OCCUPATION_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    createGuarantorOccupation: {
      controllerName: loanPrefix + '/guarantor-occupation/create',
      queryKeyName: 'CREATE_GUARANTOR_OCCUPATION_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    updateGuarantorOccupation: {
      controllerName: loanPrefix + '/guarantor-occupation/{id}/update',
      queryKeyName: 'UPDATE_GUARANTOR_OCCUPATION_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteGuarantorOccupation: {
      controllerName: loanPrefix + '/guarantor-occupation/{id}/delete',
      queryKeyName: 'DELETE_GUARANTOR_OCCUPATION',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    }
  },
  selfEmployment: {
    getGuarantorSelfEmploymentList: {
      controllerName: loanPrefix + '/guarantor-self-employment/{id}',
      queryKeyName: 'GET_GUARANTOR_SELF_EMPLOYMENT_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    createGuarantorSelfEmployment: {
      controllerName: loanPrefix + '/guarantor-self-employment/create',
      queryKeyName: 'CREATE_GUARANTOR_SELF_EMPLOYMENT_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.POST
    },
    updateGuarantorSelfEmployment: {
      controllerName: loanPrefix + '/guarantor-self-employment/{id}/update',
      queryKeyName: 'UPDATE_GUARANTOR_SELF_EMPLOYMENT_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    },
    deleteGuarantorSelfEmployment: {
      controllerName: loanPrefix + '/guarantor-self-employment/{id}/delete',
      queryKeyName: 'DELETE_GUARANTOR_SELF_EMPLOYMENT',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.DELETE
    }
  },
  income: {
    getGuarantorIncome: {
      controllerName: prefix + '/income-detail/{id}',
      queryKeyName: 'GET_GUARANTOR_INCOME_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    updateGuarantorIncome: {
      controllerName: prefix + '/income-detail/{id}',
      queryKeyName: 'UPDATE_GUARANTOR_INCOME_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  netWorth: {
    getGuarantorNetWorth: {
      controllerName: prefix + '/net-worth/{id}',
      queryKeyName: 'GET_GUARANTOR_NET_WORTH_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    updateGuarantorNetWorth: {
      controllerName: prefix + '/net-worth/{id}',
      queryKeyName: 'UPDATE_GUARANTOR_NET_WORTH_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  expense: {
    getGuarantorExpense: {
      controllerName: prefix + '/expense-detail/{id}',
      queryKeyName: 'GET_GUARANTOR_EXPENSE_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.GET
    },
    updateGuarantorExpense: {
      controllerName: prefix + '/expense-detail/{id}',
      queryKeyName: 'UPDATE_GUARANTOR_EXPENSE_DETAIL',
      requestBodyType: RequestBodyType.AUTH,
      requestMethod: RequestMethod.PUT
    }
  },
  validateGuarantorOccupationSelfEmployment: {
    controllerName: loanPrefix + '/guarantor/employment-detail/validate/{formId}',
    queryKeyName: 'VALIDATE_GUARANTOR_OCCUPATION_SELFEMPLOYMENT',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getGuarantorSummary: {
    controllerName: loanPrefix + '/guarantor/summary-detail/{id}',
    queryKeyName: 'GET_GUARANTOR_SUMMARY',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  guarantorProceed: {
    controllerName: loanPrefix + '/guarantor/summary-detail/{id}/proceed',
    queryKeyName: 'SUBMIT_GUARANTOR_SUMMARY',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

export default guarantor;
