import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-toilet-availability';

const toilet = {
  createToiletData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_TOILET_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getToiletDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_TOILET_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default toilet;
