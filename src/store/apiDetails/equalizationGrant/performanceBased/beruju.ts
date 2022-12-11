import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/beruju-indicator';

const beruju = {
  createBerujuData: {
    controllerName: prefix + '-create',
    queryKeyName: 'CREATE_BERUJU_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getBerujuDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_BERUJU_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default beruju;
