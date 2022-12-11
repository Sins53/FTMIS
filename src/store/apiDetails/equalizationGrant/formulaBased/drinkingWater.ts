import { RequestBodyType, RequestMethod } from '../../request';

const prefix = 'equalization_grant/gov-prov-drinking-water';

const drinkingWater = {
  createDrinkingWaterData: {
    controllerName: prefix,
    queryKeyName: 'CREATE_DRINKING_WATER_DATA',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.POST
  },
  getDrinkingWaterDetails: {
    controllerName: prefix,
    queryKeyName: 'GET_DRINKING_WATER_DETAILS',
    requestBodyType: RequestBodyType.AUTH,
    requestMethod: RequestMethod.GET
  }
};

export default drinkingWater;
