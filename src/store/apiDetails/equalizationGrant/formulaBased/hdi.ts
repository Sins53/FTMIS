import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/province-hdi';

const hdi = {
  calculateHdiData: {
    controllerName: prefix,
    queryKeyName: 'CALCULATE_HDI_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getHdiDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_HDI_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default hdi;
