import { RequestBodyType, RequestMethod } from '../request';

const prefix = 'users/register';

const institutionalUserRegistration = {
  addIndividualUserRegistration: {
    controllerName: prefix,
    queryKeyName: 'ADD_INDIVIDUAL_USER_REGISTRATIOM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

export default institutionalUserRegistration;
