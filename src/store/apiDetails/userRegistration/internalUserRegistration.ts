import { RequestBodyType, RequestMethod } from '../request';

const prefix = 'users/register';
const anotherPrefix = '/users/profile/admin-internal-user';

const internalUserRegistration = {
  addInternalUserRegistration: {
    controllerName: prefix + '/internal-user',
    queryKeyName: 'ADD_INTERNAL_USER_REGISTRATIOM',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.POST
  },
  getInternalUserRegistrationList: {
    controllerName: anotherPrefix,
    queryKeyName: 'GET_INTERNAL_USER_REGISTRATION',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getInternalUserRegistrationById: {
    controllerName: anotherPrefix + '/{id}',
    queryKeyName: 'GET_INTERNAL_USER_REGISTRATION_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getInternalUserRegistration: {
    controllerName: anotherPrefix,
    queryKeyName: 'GET_INTERNAL_USER_REGISTRATION',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  editInternalUserRegistrationById: {
    controllerName: anotherPrefix + '/{id}',
    queryKeyName: 'EDIT_INTERNAL_USER_BY_ID',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  editInternalUserProfile: {
    controllerName: 'users/profile/internal-user',
    queryKeyName: 'EDIT_INTERNAL_USER_PROFILE',
    requestBodyType: RequestBodyType.FORMDATA,
    requestMethod: RequestMethod.PUT
  },
  resetInternalUserPassword: {
    controllerName: 'users/internal-user/password-reset/{userId}',
    queryKeyName: 'RESET_INTERNAL_USER_PASSWORD',
    requestMethod: RequestMethod.POST
  },
  // getInternalUserProfile: {
  //   controllerName: 'users/profile/internal-user',
  //   queryKeyName: 'EDIT_INTERNAL_USER_PROFILE',
  //   requestBodyType: RequestBodyType.FORMDATA,
  //   requestMethod: RequestMethod.GET
  // },
  getInternalUserProvinceBranchList: {
    controllerName: '/users/profile/internal-user/branch-province-list',
    queryKeyName: 'GET_INTERNAL_USER_PROVINCE_BRANCH_LIST',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  deleteInternalUserRegistrationById: {
    controllerName: anotherPrefix + '/{id}',
    queryKeyName: 'DELETE_INTERNAL_USER_BY_ID',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.DELETE
  }
};

export default internalUserRegistration;
