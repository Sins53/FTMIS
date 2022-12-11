import { RequestBodyType, RequestMethod } from '../request';
const prefix = 'loan_management/admin/loan-product';
const anotherPrefix = 'loan_management/product';
const nextPrefix = 'loan_management/loan-product';

const loanProduct = {
  getAllLoanProduct: {
    controllerName: prefix + '/list',
    queryKeyName: 'GET_ALL_LOAN_PRODUCT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getLoanProductById: {
    controllerName: prefix + '/{id}/detail',
    queryKeyName: 'GET_LOAN_PRODUCT_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getLoanProductDetail: {
    controllerName: anotherPrefix + '/{id}/detail',
    queryKeyName: 'GET_LOAN_PRODUCT_DETAIL',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },
  getLoanProductList: {
    controllerName: nextPrefix + '/list',
    queryKeyName: 'GET_LOAN_PRODUCT_LIST',
    requestBodyType: RequestBodyType.NOAUTH,
    requestMethod: RequestMethod.GET
  },

  editLoanProductById: {
    controllerName: prefix + '/{id}/update',
    queryKeyName: 'EDIT_LOAN_PRODUCT_DATA_BY_ID',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  addNewLoanProduct: {
    controllerName: prefix + '/create',
    queryKeyName: 'ADD_LOAN_PRODUCT_DATA',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  deleteLoanProductById: {
    controllerName: prefix + '/{id}/delete',
    queryKeyName: 'DELETE_LOAN_PRODUCT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  },
  toggleLoanProductById: {
    controllerName: prefix + '/{id}/status',
    queryKeyName: 'TOGGLE_LOAN_PRODUCT_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getTenureCSV: {
    controllerName: '/master_data/reports/tenure-csv',
    queryKeyName: 'GET_TENURE_CSV',
    requestBodyType: RequestBodyType.FILE,
    requestMethod: RequestMethod.GET
  },
  uploadTenureCSV: {
    controllerName: '/master_data/tenure-csv-upload',
    queryKeyName: 'GET_TENURE_CSV',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  }
};

export default loanProduct;
