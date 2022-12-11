import { RequestBodyType } from '../request';

const prefix = 'users';

const userLists = {
  getAllIndividualCustomer: {
    controllerName: prefix + '/customer-users',
    queryKeyName: 'GET_ALL_CUSTOMER_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getIndividualCustomerById: {
    controllerName: prefix + '/profile/individual-user/{id}',
    queryKeyName: 'GET_CUSTOMER_DATA_BY_ID',
    requestBodyType: RequestBodyType.AUTH
  },
  getAllFirmCustomer: {
    controllerName: prefix + '/customer-users',
    queryKeyName: 'GET_ALL_FIRM_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getAllInternalUser: {
    controllerName: prefix + '/internal-users',
    queryKeyName: 'GET_ALL_INTERNAL_USER_DATA',
    requestBodyType: RequestBodyType.AUTH
  },
  getIndividualUserListCVS: {
    controllerName: 'reports/csv/individual-users',
    queryKeyName: 'GET_INDIVIDUAL_USER_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  },
  getInstitutionalUserListCVS: {
    controllerName: '/reports/csv/institutional-users',
    queryKeyName: 'GET_INSTITUTION_USER_LIST_CVS',
    requestBodyType: RequestBodyType.FILE
  }
};
export default userLists;
