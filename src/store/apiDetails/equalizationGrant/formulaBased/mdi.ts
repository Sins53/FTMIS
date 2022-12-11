import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/province-mdi';

const mdi = {
  calculateMdiData: {
    controllerName: prefix,
    queryKeyName: 'CALCULATE_MDI_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getMdiDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_MDI_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default mdi;
