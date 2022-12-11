import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'psychometric_test';

const psychometricDynamicUrl = {
  getPsychometricUrl: {
    controllerName: prefix + '/config',
    queryKeyName: 'GET_PSYCHOMETRIC_DYNAMIC_URL',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  addNewPsychometricDynamicUrl: {
    controllerName: prefix + '/config',
    queryKeyName: 'ADD_NEW_PSYCHOMETRIC_DYNAMIC_URL',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  editPsychometricDynamicUrl: {
    controllerName: prefix + '/config/{id}',
    queryKeyName: 'EDIT_PSYCHOMETRIC_DYNAMIC_URL',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.PUT
  }
};

export default psychometricDynamicUrl;
