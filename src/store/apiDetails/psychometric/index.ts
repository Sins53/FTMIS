import { RequestBodyType, RequestMethod } from '../request';

const prefix = '/psychometric_test';

const psychometricApis = {
  savePsychometricUserAndGetUrl: {
    controllerName: prefix + '/user/create',
    queryKeyName: 'CREATE_USER_AND_GET_USER',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};
export default psychometricApis;
