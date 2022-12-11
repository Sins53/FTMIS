import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'master_data/admin';
const clientPrefix = 'master_data';

const loanType = {
  getAllLoanType: {
    controllerName: prefix + '/loan-type/list',
    queryKeyName: 'GET_ALL_LOAN_TYPE_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getClientLoanType: {
    controllerName: clientPrefix + '/loan-types',
    queryKeyName: 'GET_CLIENT_LOAN_TYPE_DATA',
    requestBodyType: RequestBodyType.NOAUTH
  },
  getLoanTypeById: {
    controllerName: prefix + '/loan-type/{id}',
    queryKeyName: 'GET_LOAN_TYPE_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH
  },
  editLoanTypeById: {
    controllerName: prefix + '/loan-type/{id}/update',
    queryKeyName: 'EDIT_LOAN_TYPE_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  },
  addNewLoanType: {
    controllerName: prefix + '/loan-type/create',
    queryKeyName: 'ADD_LOAN_TYPE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  deleteLoanTypeById: {
    controllerName: prefix + '/loan-type/{id}/delete',
    queryKeyName: 'DELETE_LOAN_TYPE_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default loanType;
