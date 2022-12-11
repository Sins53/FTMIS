import { RequestBodyType, RequestMethod } from '../request';

const prefix = 'users/register';

const individualUserRegistration = {
  addIndividualUserRegistration: {
    controllerName: prefix,
    queryKeyName: 'ADD_INDIVIDUAL_USER_REGISTRATIOM',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  }
};

export default individualUserRegistration;
