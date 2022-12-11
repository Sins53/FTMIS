import { RequestBodyType, RequestMethod } from '../../request';
const prefix = 'master_data/admin';
const clientPrefix = 'master_data';
const loanCategory = {
  getAllLoanCategory: {
    controllerName: prefix + '/loan-category/list',
    queryKeyName: 'GET_ALL_LOAN_CATEGORY_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getClientLoanCategory: {
    controllerName: clientPrefix + '/loan-categories',
    queryKeyName: 'GET_CLIENT_LOAN_CATEGORY_DATA',
    requestBodyType: RequestBodyType.NOAUTH
  },
  getLoanCategoryById: {
    controllerName: prefix + '/loan-category/{id}',
    queryKeyName: 'GET_LOAN_CATEGORY_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH
  },
  editLoanCategoryById: {
    controllerName: prefix + '/loan-category/{id}/update',
    queryKeyName: 'EDIT_LOAN_CATEGORY_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  addNewLoanCategory: {
    controllerName: prefix + '/loan-category/create',
    queryKeyName: 'ADD_LOAN_CATEGORY_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  deleteLoanCategoryById: {
    controllerName: prefix + '/loan-category/{id}/delete',
    queryKeyName: 'DELETE_LOAN_CATEGORY_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default loanCategory;
