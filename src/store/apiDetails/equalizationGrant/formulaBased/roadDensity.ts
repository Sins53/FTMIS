import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/province-road-density';

const roadDensity = {
  calculateRoadDensityData: {
    controllerName: prefix,
    queryKeyName: 'CALCULATE_ROAD_DENSITY_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  },
  getRoadDensityDetails: {
    controllerName: prefix + '-list',
    queryKeyName: 'GET_ROAD_DENSITY_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default roadDensity;
