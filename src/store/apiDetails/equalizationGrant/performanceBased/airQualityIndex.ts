import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-air-quality-index';

const airQualityIndex = {
  createAirQualityIndex: {
    controllerName: prefix,
    queryKeyName: 'CREATE_AIR_QUALITY_INDEX',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getAirQualityIndex: {
    controllerName: prefix,
    queryKeyName: 'GET_AIR_QUALITY_INDEX',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default airQualityIndex;
