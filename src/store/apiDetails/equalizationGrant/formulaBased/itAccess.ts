import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/province-it-access';

const itAccess = {
  calculateItAccessData: {
    controllerName: prefix,
    queryKeyName: 'CALCULATE_IT_ACCESS_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getItAccessDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_IT_ACCESS_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default itAccess;
